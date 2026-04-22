import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { COOKIE_NAMES } from "@/constants/routes";

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAMES.at);
  const sessionId = request.cookies.get(COOKIE_NAMES.sid);
  const { pathname } = request.nextUrl;

  console.log("middleware working →", pathname);

  const prefixMap: Record<string, string> = {
    "/users": "user",
    "/admin": "admin",
    "/recruiter": "recruiter",
  };

  let inferredPrefix: string | null = null;
  for (const prefix of Object.keys(prefixMap)) {
    if (pathname.startsWith(prefix)) {
      inferredPrefix = prefix;
      break;
    }
  }

  const isAuthPage = pathname.includes("/auth/");

  const getDashboardUrl = (prefix: string | null) => {
    return new URL(`${prefix ? prefix : ""}/dashboard`, request.url);
  };

  const getLoginUrl = (prefix: string | null) => {
    return new URL(`${prefix ? prefix : ""}/auth/login`, request.url);
  };

  if (!accessToken && !sessionId) {
    if (isAuthPage) return NextResponse.next();
    return NextResponse.redirect(getLoginUrl(inferredPrefix));
  }

  if (accessToken) {
    if (isAuthPage) {
      return NextResponse.redirect(getDashboardUrl(inferredPrefix));
    }

    if (inferredPrefix) {
      const role = prefixMap[inferredPrefix];
      try {
        const checkBlock = await fetch(
          `${request.nextUrl.origin}/api/auth/block?role=${role}`,
          {
            headers: {
              cookie: request.headers.get("cookie") ?? "",
            },
          },
        );
        const data = await checkBlock.json();

        if (data.blocked) {
          const response = NextResponse.redirect(getLoginUrl(inferredPrefix));

          response.cookies.set(COOKIE_NAMES.at, "", {
            expires: new Date(0),
            path: "/",
          });
          response.cookies.set(COOKIE_NAMES.sid, "", {
            expires: new Date(0),
            path: "/",
          });

          return response;
        }
      } catch (error) {
        console.log("Error checking block status", error);
      }
    }

    return NextResponse.next();
  }

  if (sessionId && inferredPrefix) {
    try {
      const refreshResponse = await fetch(
        `${request.nextUrl.origin}/api/auth/refresh?role=${prefixMap[inferredPrefix]}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            cookie: request.headers.get("cookie") ?? "",
          },
        },
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();

        if (data.success) {
          if (isAuthPage) {
            return NextResponse.redirect(getDashboardUrl(inferredPrefix));
          }
          const response = NextResponse.redirect(request.nextUrl);

          refreshResponse.headers.forEach((value, key) => {
            if (key.toLowerCase() === "set-cookie") {
              response.headers.append("Set-Cookie", value);
            }
          });

          return response;
        }
      }

      if (isAuthPage) return NextResponse.next();

      const response = NextResponse.redirect(getLoginUrl(inferredPrefix));

      response.cookies.set(COOKIE_NAMES.sid, "", {
        expires: new Date(0),
        path: "/",
      });

      return response;
    } catch (_err) {
      if (isAuthPage) return NextResponse.next();

      const response = NextResponse.redirect(getLoginUrl(inferredPrefix));

      response.cookies.set(COOKIE_NAMES.sid, "", {
        expires: new Date(0),
        path: "/",
      });

      return response;
    }
  }

  if (isAuthPage) return NextResponse.next();

  return NextResponse.redirect(getLoginUrl(inferredPrefix));
}

export const config = {
  matcher: ["/users/:path*", "/admin/:path*", "/recruiter/:path*"],
};
