
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
    const cookieHeader = request.headers.get("cookie");
    const accessToken = cookieHeader?.match(/accessToken=([^;]+)/)?.[1];
    const sessionId = cookieHeader?.match(/session_id=([^;]+)/)?.[1];

    if (accessToken || sessionId) {
        return NextResponse.json({ loggedIn: true });
    }

    return NextResponse.json({ loggedIn: false });
}