"use server";

import { db } from "@/db/client";

export async function getAllItems() {
  return db.from("items").select();
}

export async function getItemsByShorty(shorty: string) {
  return db.from("items").select().eq("short_url", shorty);
}
