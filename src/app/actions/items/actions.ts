"use server";

import { db } from "@/db/client";
import { headers } from "next/headers";

export async function getAllItems() {
  return db.from("items").select();
}

export async function getItemsByShorty(shorty: string) {
  return db.from("items").select().eq("short_url", shorty);
}

export async function createShortUrl(url: string) {
  const headerList = headers();
  const hostname = headerList.get("x-current-hostname");
  const randomString = (length = 6) =>
    Math.random()
      .toString(20)
      .slice(2, length + 2);
  return `https://${hostname}/${randomString()}`;
}
