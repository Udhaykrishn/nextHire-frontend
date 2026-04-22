"use client";

import {
  Bell,
  Briefcase,
  FileText,
  LayoutDashboard,
  MessageCircle,
  UserCircle,
} from "lucide-react";
import ProtectedLayout from "@/components/layout/layout-client";

const NAV_ITEMS = [
  {
    title: "Dashboard",
    url: "/users/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Jobs",
    url: "/users/jobs",
    icon: Briefcase,
  },
  {
    title: "Applications",
    url: "/users/applications",
    icon: FileText,
  },
  {
    title: "Notifications",
    url: "/users/notifications",
    icon: Bell,
  },
  {
    title: "Chat",
    url: "/users/chat",
    icon: MessageCircle,
  },
  {
    title: "Profile",
    url: "/users/profile",
    icon: UserCircle,
  },
];

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function UserProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  return (
    <ProtectedLayout
      navItems={NAV_ITEMS}
      title="NextHire"
      subtitle="Find Your Dream Job"
      logoColor="from-blue-600 to-indigo-600"
    >
      {children}
    </ProtectedLayout>
  );
}
