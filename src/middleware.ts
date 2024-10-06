import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Log the current request pathname
  const headers = new Headers(request.headers);
  headers.set("x-current-hostname", request.nextUrl.hostname);
  headers.set("x-current-port", request.nextUrl.port);
  headers.set("x-current-protocol", request.nextUrl.protocol);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
