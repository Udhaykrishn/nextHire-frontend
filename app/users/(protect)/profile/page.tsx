import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My Profile | NextHire",
  description: "View and manage your professional profile on NextHire.",
};

import { ProfileClient } from "@/modules/users/components/profile/profile-client";

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 space-y-8 animate-pulse">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-slate-100 dark:bg-zinc-800 rounded-full" />
            <div className="space-y-2">
              <div className="h-6 w-48 bg-slate-100 dark:bg-zinc-800 rounded" />
              <div className="h-4 w-32 bg-slate-100 dark:bg-zinc-800 rounded" />
            </div>
          </div>
          <div className="grid gap-6">
            <div className="h-32 w-full bg-slate-100 dark:bg-zinc-800 rounded-xl" />
            <div className="h-48 w-full bg-slate-100 dark:bg-zinc-800 rounded-xl" />
          </div>
        </div>
      }
    >
      <ProfileClient />
    </Suspense>
  );
}
