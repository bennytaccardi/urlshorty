"use server";

import { getDbClient } from "@/db/client";
import { appContext } from "@/lib/appContext";
import { headers } from "next/headers";

export async function getAllItems() {
  const db = await getDbClient();
  return db.from("items").select();
}

export async function getItemsByShorty(shorty: string): Promise<string> {
  const db = await getDbClient();
  const response = await db
    .from("items")
    .select()
    .eq("short_key", shorty)
    .single();
  return response.data.url;
}

export async function createShortUrl(url: string): Promise<string> {
  const db = await getDbClient();
  const headerList = headers();
  const hostname = headerList.get("x-current-hostname");
  const protocol = headerList.get("x-current-protocol");
  const port =
    headerList.get("x-current-port") !== ""
      ? `:${headerList.get("x-current-port")}`
      : "";

  const shortKey = generateRandomString();
  const shortUrl = buildShortUrl(port, shortKey, protocol, hostname);
  const { error } = await db.from("items").insert({
    url,
    short_url: shortUrl,
    short_key: shortKey,
  });

  if (!error) {
    appContext.service.requestCounter.inc(1);
    return shortUrl;
  } else {
    throw new Error(error.message);
  }
}

function generateRandomString(length = 6): string {
  return Math.random()
    .toString(20)
    .slice(2, length + 2);
}

function buildShortUrl(
  port: string,
  shortKey: string,
  protocol: string | null,
  hostname: string | null
): string {
  return `${protocol}//${hostname}${port}/${shortKey}`;
}
