import { Suspense } from "react";
import { ApplicationsClient } from "@/modules/users/components/applications-client";

export default function ApplicationsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 animate-pulse">
          <div className="h-20 bg-muted rounded-xl w-full" />
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-muted rounded-xl" />
            ))}
          </div>
          <div className="h-64 bg-muted rounded-xl w-full" />
        </div>
      }
    >
      <ApplicationsClient />
    </Suspense>
  );
}
