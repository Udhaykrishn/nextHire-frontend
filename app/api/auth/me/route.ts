export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionId = cookieStore.get("session_id")?.value;

  if (accessToken || sessionId) {
    return NextResponse.json({ loggedIn: true });
  }

  return NextResponse.json({ loggedIn: false });
}
