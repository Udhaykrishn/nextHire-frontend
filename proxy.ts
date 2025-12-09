import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
	const accessToken = request.cookies.get("accessToken");
	const sessionId = request.cookies.get("session_id");
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

	const getLoginUrl = (prefix: string | null) => {
		return new URL(`${prefix ? prefix : ""}/auth/login`, request.url);
	};

	if (!accessToken && !sessionId) {
		return NextResponse.redirect(getLoginUrl(inferredPrefix));
	}

	if (accessToken) {
		console.log("working the access token section ----------------")
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

					response.cookies.set("accessToken", "", {
						expires: new Date(0),
						path: "/",
					});
					response.cookies.set("session_id", "", {
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
					const response = NextResponse.redirect(request.nextUrl);

					refreshResponse.headers.forEach((value, key) => {
						if (key.toLowerCase() === "set-cookie") {
							response.headers.append("Set-Cookie", value);
						}
					});

					return response;
				}
			}

			const response = NextResponse.redirect(getLoginUrl(inferredPrefix));

			response.cookies.set("session_id", "", {
				expires: new Date(0),
				path: "/",
			});

			return response;
		} catch (err) {
			const response = NextResponse.redirect(getLoginUrl(inferredPrefix));

			response.cookies.set("session_id", "", {
				expires: new Date(0),
				path: "/",
			});

			return response;
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


// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// export function proxy(request: NextRequest) {
//   const accessToken = request.cookies.get("accessToken");
//   const sessionId = request.cookies.get("session_id");
//   const { pathname } = request.nextUrl;

//   if (pathname.includes("/auth/")) {
//     return NextResponse.next();
//   }

//   const rolePrefixes = {
//     "/users": "users",
//     "/admin": "admin",
//     "/recruiter": "recruiter",
//   };

//   const rolePrefix = Object.keys(rolePrefixes).find((p) =>
//     pathname.startsWith(p)
//   );

//   const loginUrl = new URL(
//     `${rolePrefix ? rolePrefix : ""}/auth/login`,
//     request.url
//   );

//   const isProtected = !!rolePrefix;

//   if (isProtected && !accessToken && !sessionId) {
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
// 	matcher: [
// 		"/users/((?!auth/).*)",
// 		"/admin/((?!auth/).*)",
// 		"/recruiter/((?!auth/).*)",
// 	],
// };