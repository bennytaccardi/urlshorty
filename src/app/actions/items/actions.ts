"use server";

import { createClient } from "@/db/client";
import { headers } from "next/headers";

export async function getAllItems() {
  const db = await createClient();
  return db.from("items").select();
}

export async function getItemsByShorty(shorty: string): Promise<string> {
  const db = await createClient();
  const response = await db
    .from("items")
    .select()
    .eq("short_key", shorty)
    .single();
  return response.data.url;
}

export async function createShortUrl(url: string): Promise<string> {
  const db = await createClient();
  const headerList = headers();
  const hostname = headerList.get("x-current-hostname");
  const protocol = headerList.get("x-current-protocol");
  const port =
    headerList.get("x-current-port") !== ""
      ? `:${headerList.get("x-current-port")}`
      : null;
  const randomString = (length = 6) =>
    Math.random()
      .toString(20)
      .slice(2, length + 2);
  const shortKey = randomString();
  const shortUrl = `${protocol}://${hostname}${port}/${shortKey}`;
  const { error } = await db.from("items").insert({
    url,
    short_url: shortUrl,
    short_key: shortKey,
  });
  console.log(error);
  return shortUrl;
}
