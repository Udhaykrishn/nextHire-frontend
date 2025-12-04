
"use client";

import Link from "next/link";
import { AnimatedThemeToggle } from "@/components/animated-theme-toggle";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { User, LogOut, Menu, X, Briefcase, UserCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
    isAuthenticated?: boolean;
    userRole?: 'candidate' | 'employer' | null;
    userName?: string;
    onLogout?: () => void;
}

export function Navbar({
    isAuthenticated = false,
    userRole = null,
    userName = "User",
    onLogout
}: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const handleLogout = () => {
        onLogout?.();
        setProfileMenuOpen(false);
    };

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

                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                href="/"
                                className="group flex items-center gap-1 text-[15px] font-medium text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                            >
                                Jobs
                                <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                            </Link>
                            <Link
                                href="/"
                                className="text-[15px] font-medium text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                            >
                                Companies
                            </Link>
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-[15px] font-medium text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                            >
                                Services
                                <span className="rounded-md bg-orange-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                                    NEW
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <AnimatedThemeToggle direction="ltr" className="!p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />

                        {!isAuthenticated ? (
                            <div className="hidden md:flex items-center gap-4">
                                <Link
                                    href="/login"
                                    className="text-[15px] font-semibold text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                                >
                                    Employer Login
                                </Link>

                                <Link href="/login">
                                    <Button
                                        className="rounded-full bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-5 font-semibold shadow-lg shadow-cyan-200/50 border-0"
                                    >
                                        Candidate Login
                                    </Button>
                                </Link>
                            </div>
                        ) : (

                            <div className="relative hidden md:block">
                                <button
                                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                    className="flex items-center space-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-cyan-200 transition-all dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    <div className="h-6 w-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center">
                                        <User className="h-3.5 w-3.5" />
                                    </div>
                                    <span>{userName}</span>
                                    <ChevronDown className={`h - 4 w - 4 text - gray - 400 transition - transform duration - 200 ${profileMenuOpen ? 'rotate-180' : ''} `} />
                                </button>

                                {profileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-100 bg-white shadow-xl shadow-gray-200/20 dark:border-gray-700 dark:bg-gray-800 dark:shadow-black/20 p-1">
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 mb-1">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{userName}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userRole}</p>
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors"
                                            onClick={() => setProfileMenuOpen(false)}
                                        >
                                            <UserCircle className="h-4 w-4 text-gray-400" />
                                            My Profile
                                        </Link>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors"
                                            onClick={() => setProfileMenuOpen(false)}
                                        >
                                            <Briefcase className="h-4 w-4 text-gray-400" />
                                            Dashboard
                                        </Link>
                                        <div className="my-1 border-t border-gray-100 dark:border-gray-700" />
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
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

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-zinc-900">
                    <div className="space-y-1 px-4 pb-4 pt-2">
                        {!isAuthenticated ? (
                            <div className="mt-4 space-y-3 border-t border-gray-100 pt-4 dark:border-gray-800">
                                <Link href="/login" className="block text-center">
                                    <span className="text-sm font-semibold text-gray-600 hover:text-cyan-600 dark:text-gray-400">
                                        Employer Login
                                    </span>
                                </Link>
                                <Link href="/login" className="block">
                                    <Button
                                        className="w-full rounded-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-6"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Candidate Login
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 dark:border-gray-800">
                                <div className="px-3 py-2">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{userName}</p>
                                    <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                                </div>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <UserCircle className="h-5 w-5" />
                                    My Profile
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Briefcase className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-800"
                                >
                                    <LogOut className="h-5 w-5" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {profileMenuOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileMenuOpen(false)}
                />
            )}
        </nav>
    );
}

