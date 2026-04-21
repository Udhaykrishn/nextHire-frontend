"use client";

import * as React from "react";
import { ProfileContent } from "@/app/users/(protect)/profile/profile-content";
import { UserAuthService } from "@/services/auth/user.service";
import { useAuthStore } from "@/stores/auth-store";

export function ProfileClient() {
  const { user, updateUser } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        // The user object in store might be partial, let's fetch full profile
        const _response = await UserAuthService.updateProfile({}); // Calling update with empty object to get current profile
        // Wait, maybe there's a better way to get full user?
        // In UserController, findUser(@Req() req: any) returns full user

        // Let's check userApi.get("/user/profile")
        // Fetching from /user/profile
        const userResponse = await (await import("@/lib/user.api")).userApi.get(
          "/user/profile",
        );
        if (userResponse.data) {
          updateUser(userResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [updateUser]);

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
