"use client";

import {
  Briefcase,
  ChevronDown,
  LogOut,
  Menu,
  Sparkles,
  User,
  UserCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { AnimatedThemeToggle } from "@/components/animated-theme-toggle";
import { userApi } from "@/lib/user.api";

export function Navbar({ user }: { user: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const isAuthenticated = !!user;

  async function handleLogout() {
    await userApi.post("/auth/user/logout");
    window.location.reload();
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-zinc-900/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 text-white font-bold text-lg shadow-cyan-200/50 shadow-lg">
                JH
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                JobHub
              </span>
            </Link>

            {isHomePage && (
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  href="/"
                  className="group flex items-center gap-2 text-[15px] font-semibold text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                >
                  <Briefcase className="h-4 w-4" />
                  Jobs
                  <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-[15px] font-semibold text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                >
                  <UserCircle className="h-4 w-4" />
                  Companies
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-[15px] font-semibold text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                >
                  <Sparkles className="h-4 w-4" />
                  Services
                  <span className="rounded-md bg-orange-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                    NEW
                  </span>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <AnimatedThemeToggle direction="ltr" className="!p-2" />

            {!isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-[15px] font-semibold text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                >
                  Employer Login
                </Link>

                <Link href="/login">
                  <Button className="rounded-full bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-5">
                    Candidate Login
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 rounded-full border px-4 py-2"
                >
                  <div className="h-6 w-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <span>{"User"}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition ${profileMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow-lg p-1">
                    <div className="px-4 py-3 border-b mb-1"></div>

                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2.5"
                    >
                      <UserCircle className="h-4 w-4" />
                      My Profile
                    </Link>

                    <Link
                      href={
                        user?.role === "admin"
                          ? "/admin/dashboard"
                          : "/users/dashboard"
                      }
                      className="flex items-center gap-2 px-4 py-2.5"
                    >
                      <Briefcase className="h-4 w-4" />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-lg p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {!isAuthenticated ? (
              <div className="mt-4 space-y-3 border-t pt-4">
                <Link href="/login" className="block text-center">
                  Employer Login
                </Link>
                <Link href="/login" className="block">
                  <Button className="w-full rounded-full bg-cyan-400 text-white py-6">
                    Candidate Login
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 space-y-2 border-t pt-4">
                <p className="px-3 py-2 font-black text-sm uppercase tracking-tighter italic">
                  {user?.name}
                </p>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2 text-sm font-semibold"
                >
                  <UserCircle className="h-4 w-4" />
                  My Profile
                </Link>
                <Link
                  href={
                    user?.role === "admin"
                      ? "/admin/dashboard"
                      : "/users/dashboard"
                  }
                  className="flex items-center gap-3 px-3 py-2 text-sm font-semibold"
                >
                  <Briefcase className="h-4 w-4" />
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-3 py-2 text-red-600 text-sm font-semibold"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
