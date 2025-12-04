import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken");
    const sessionId = request.cookies.get("session_id");
    const { pathname } = request.nextUrl;

    console.log("proxy middleware working, path is ->", pathname)

    if (pathname.includes("/auth/")) {
        const res = NextResponse.next();
        res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
        return res;
    }

    let inferredPrefix: string | null = null;
    const prefixMap: Record<string, string> = {
        '/users': 'users',
        '/admin': 'admin',
        '/recruiter': 'recruiter',
    };

    for (const [prefix, _] of Object.entries(prefixMap)) {
        if (pathname.startsWith(prefix)) {
            inferredPrefix = prefix;
            break;
        }
    }

    const getLoginUrl = (prefix: string | null) => {
        if (prefix) {
            return new URL(`${prefix}/auth/login`, request.url);
        }
        return new URL("/login", request.url);
    };

    if (!accessToken && !sessionId) {
        return NextResponse.redirect(getLoginUrl(inferredPrefix));
    }

    if (accessToken) {
        return NextResponse.next();
    }

    if (sessionId && inferredPrefix) {
        const origin = request.nextUrl.origin;
        const refreshPath = `${inferredPrefix}/auth/refresh`;
        try {
            const refreshResponse = await fetch(`${origin}/${refreshPath}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (refreshResponse.ok) {
                const data = await refreshResponse.json();
                if (data.success) {
                    const response = NextResponse.next();
                    refreshResponse.headers.forEach((value, key) => {
                        if (key.toLowerCase() === 'set-cookie') {
                            response.headers.append(key, value);
                        }
                    });
                    return response;
                }
            }

            return NextResponse.redirect(getLoginUrl(inferredPrefix));
        } catch (error) {
            console.error('Auth refresh error:', error);
            return NextResponse.redirect(getLoginUrl(inferredPrefix));
        }
    }

    return NextResponse.redirect(getLoginUrl(inferredPrefix));
}

export const config = {
    matcher: [
        "/users/((?!auth/).*)",
        "/admin/((?!auth/).*)",
        "/recruiter/((?!auth/).*)",
    ],
};