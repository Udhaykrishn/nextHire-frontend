"use client";

import { useEffect, useState } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const [checking, setChecking] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });

        const data: { loggedIn: boolean } = await res.json();

        if (data.loggedIn) {
          setIsAuthenticated(true);
          window.location.replace("/admin/dashboard");
          return;
        }

        setIsAuthenticated(false);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    checkAuth();

    return () => controller.abort();
  }, []);

  if (checking || isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
        <div className="relative h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-cyan-500" />
      </div>
    );
  }

  return <main>{children}</main>;
}
