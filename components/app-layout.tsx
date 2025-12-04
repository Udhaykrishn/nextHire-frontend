"use client";

import { Navbar } from "@/components/navbar";
import { useAuth } from "@/providers/auth-provider";

export function AppLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <>
            <Navbar
                isAuthenticated={isAuthenticated}
                userName={user?.name}
                onLogout={logout}
            />
            <main>{children}</main>
        </>
    );
}
