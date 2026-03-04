import { Suspense } from "react";
import { RecruiterProfileClient } from "@/modules/recruiter/components/profile/recruiter-profile-client";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="p-12 space-y-8 animate-pulse text-center">
          <div className="w-24 h-24 bg-muted rounded-full mx-auto" />
          <div className="h-6 w-48 bg-muted rounded mx-auto" />
          <div className="h-4 w-32 bg-muted rounded mx-auto" />
        </div>
      }
    >
      <RecruiterProfileClient />
    </Suspense>
  );
}
