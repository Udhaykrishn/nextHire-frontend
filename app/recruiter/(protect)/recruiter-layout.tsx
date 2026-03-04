"use client";

import {
  Briefcase,
  FileText,
  LayoutDashboard,
  MessageCircle,
  UserCircle,
  Users,
} from "lucide-react";
import ProtectedLayout from "@/components/layout/layout-client";

const NAV_ITEMS = [
  {
    title: "Dashboard",
    url: "/recruiter/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Jobs",
    url: "/recruiter/jobs",
    icon: Briefcase,
  },
  {
    title: "Candidates",
    url: "/recruiter/candidates",
    icon: Users,
  },
  {
    title: "Applications",
    url: "/recruiter/applications",
    icon: FileText,
  },
  {
    title: "Messages",
    url: "/recruiter/chat",
    icon: MessageCircle,
  },
  {
    title: "Profile",
    url: "/recruiter/profile",
    icon: UserCircle,
  },
];

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function RecruiterProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  return (
    <ProtectedLayout
      navItems={NAV_ITEMS}
      title="NextHire Recruiter"
      subtitle="Manage your hiring"
      logoColor="from-purple-600 to-pink-600"
    >
      {children}
    </ProtectedLayout>
  );
}
