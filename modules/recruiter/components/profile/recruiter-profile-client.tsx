"use client";

import { RecruiterProfileContent } from "@/app/recruiter/(protect)/profile/recruiter-profile-content";
import { useAuthStore } from "@/stores/auth-store";

export function RecruiterProfileClient() {
  const { user } = useAuthStore();

  return (
    <div className="container py-8 max-w-5xl mx-auto space-y-8">
      <RecruiterProfileContent user={user} />
    </div>
  );
}
