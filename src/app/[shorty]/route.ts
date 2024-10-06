"use server";

import { NextRequest } from "next/server";
import { getItemsByShorty } from "../actions/items/actions";
import { redirect } from "next/navigation";

export async function GET(
  req: NextRequest,
  context: { params: { shorty: string } }
) {
  const { shorty } = context.params;
  const originalUrl = await getItemsByShorty(shorty);
  console.log(originalUrl);
  redirect(originalUrl);
}
