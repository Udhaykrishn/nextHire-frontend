"use client";

import { Building2, LayoutDashboard, Users } from "lucide-react";
import * as React from "react";
import ProtectedLayout from "@/components/layout/layout-client";
import { ROUTES } from "@/constants";

const NAV_ITEMS = [
  {
    title: "Dashboard",
    url: ROUTES.PROTECTED.ADMIN_DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Recruiters",
    url: "/admin/recruiters",
    icon: Building2,
  },
];

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function AdminProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  return (
    <ProtectedLayout
      navItems={NAV_ITEMS}
      title="NextHire Admin"
      subtitle="Administration"
      logoColor="from-red-600 to-orange-600"
    >
      {children}
    </ProtectedLayout>
  );
}
