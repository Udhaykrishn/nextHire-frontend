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
                if (error instanceof Error && error.name === 'AbortError') {
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
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl animate-pulse" />

                    <div className="relative h-16 w-16 animate-spin rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 dark:border-t-blue-400" />

                    <div className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping" />
                </div>

                <p className="mt-6 text-sm font-medium text-slate-600 dark:text-slate-400 animate-pulse">
                    Loading...
                </p>
            </div>
        );
    }

    return <>{children}</>;
}