import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");

    if (!backendUrl) {
      return NextResponse.json(
        { success: false, message: "API URL not configured" },
        { status: 500 },
      );
    }

    const cookieHeader = request.headers.get("cookie") || "";

    const refreshResponse = await fetch(`${backendUrl}/auth/${role}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader,
      },
      credentials: "include",
    });

    const data = await refreshResponse.json();

    if (!refreshResponse.ok || !data.success) {
      return NextResponse.json(
        { success: false, message: "Token refresh failed" },
        { status: 401 },
      );
    }

    const response = NextResponse.json(
      { success: true, accessToken: data.accessToken },
      { status: 200 },
    );

    const setCookies = refreshResponse.headers.get("set-cookie");
    if (setCookies) {
      response.headers.append("Set-Cookie", setCookies);
    }

    return response;
  } catch (err) {
    console.error("REFRESH ERROR → ", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
