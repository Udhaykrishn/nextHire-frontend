"use client";

import { ProfileContent } from "@/app/users/(protect)/profile/profile-content";
import { useProfileData } from "@/modules/users/hooks/use-profile-data";

export function ProfileClient() {
  const { user, isLoading } = useProfileData();

  if (isLoading) {
    return (
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
    );
  }

  return (
    <div className="container py-8 max-w-5xl mx-auto space-y-8">
      <ProfileContent user={user} />
    </div>
  );
}
