import { Suspense } from "react";
import { DashboardClient } from "./dashboard-client";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 flex-col gap-4 animate-pulse">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-video rounded-xl bg-muted/50" />
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
