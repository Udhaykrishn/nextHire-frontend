import type { Metadata } from "next";
import { Suspense } from "react";
import { DashboardClient } from "./dashboard-client";

export const metadata: Metadata = {
  title: "Recruiter Dashboard | NextHire",
  description: "Manage your job postings and candidates on NextHire.",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 flex-col gap-4 animate-pulse">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={`skeleton-${item}`}
                className="aspect-video rounded-xl bg-muted/50"
              />
            ))}
          </div>
          <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50" />
        </div>
      }
    >
      <DashboardClient />
    </Suspense>
  );
}
