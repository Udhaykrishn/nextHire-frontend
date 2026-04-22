"use client";

import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useEffect } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-auth-check"],
    queryFn: async () => {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      });
      return res.json() as Promise<{ loggedIn: boolean }>;
    },
    retry: false,
  });

  useEffect(() => {
    if (data?.loggedIn) {
      redirect("/admin/dashboard");
    }
  }, [data]);

  if (isLoading || data?.loggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
        <div className="relative h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-cyan-500" />
      </div>
    );
  }

  return <main>{children}</main>;
}
