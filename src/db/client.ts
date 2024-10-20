"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const createClient = async () => {
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

export const getDbClient = async (): Promise<
  ReturnType<typeof createClient>
> => {
  if (!globalThis.dbClientContextGlobal) {
    globalThis.dbClientContextGlobal = createClient();
  }
  return globalThis.dbClientContextGlobal;
};
