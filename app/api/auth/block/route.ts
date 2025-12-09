
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
    const cookieHeader = request.headers.get("cookie") || "";
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    const blockResponse = await fetch(`${backendUrl}/${role}/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            cookie: cookieHeader,
        },
        credentials: "include",
    });

    const blockData = await blockResponse.json();

    if (blockData.error.statusCode === 403) {
        return NextResponse.json({ blocked: true });
    }

    return NextResponse.json({ blocked: false });
}