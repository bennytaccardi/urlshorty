"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const createClient = () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  return supabase;
};

declare global {
  // eslint-disable-next-line no-var
  var dbClientContextGlobal: ReturnType<typeof createClient> | undefined;
}

export const dbClient = globalThis.dbClientContextGlobal ?? createClient();
globalThis.dbClientContextGlobal = dbClient;
