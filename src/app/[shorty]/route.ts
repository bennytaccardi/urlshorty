import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { shorty: string } }
) {
  const { shorty } = context.params;
  console.log(shorty);
  return NextResponse.json({ result: shorty });
}
