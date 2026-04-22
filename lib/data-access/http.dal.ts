"use server";

import "server-only";
import { redirect } from "next/navigation";

export async function http(
  url: string,
  options: RequestInit & { role: "user" | "admin" | "recruiter" },
) {
  const { role, ...fetchOptions } = options;

  // Map role to correct frontend route prefix
  const roleRouteMap: Record<string, string> = {
    user: "users",
    admin: "admin",
    recruiter: "recruiter",
  };
  const routePrefix = roleRouteMap[role];

  let response = await sendRequest(url, fetchOptions);

  if (response.status === 401) {
    const refreshSuccess = await tryRefreshToken(role);

    if (refreshSuccess) {
      response = await sendRequest(url, fetchOptions);
    } else {
      await logoutFromBackend(role);
      redirect(`/${routePrefix}/auth/login`);
    }
  }

  if (response.status === 403) {
    await logoutFromBackend(role);
    redirect(`/${routePrefix}/auth/login`);
  }

  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Request failed: ${response.status}`,
      );
    } catch (_e) {
      throw new Error(`Request failed: ${response.status}`);
    }
  }

  return response.json();
}

async function sendRequest(url: string, options: RequestInit = {}) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
}

async function tryRefreshToken(role: "user" | "admin" | "recruiter") {
  const refresh = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/${role}/refresh`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  return refresh.ok;
}

async function logoutFromBackend(role: "user" | "admin" | "recruiter") {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${role}/logout`, {
    method: "POST",
    credentials: "include",
  });
}
