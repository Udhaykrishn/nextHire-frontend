import { Suspense } from "react";
import { DashboardContent } from "@/modules/users/components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <Suspense
        fallback={
          <div className="flex flex-1 flex-col gap-6 animate-pulse">
            <div className="h-48 w-full bg-slate-100 dark:bg-zinc-800 rounded-xl" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-slate-100 dark:bg-zinc-800 rounded-xl"
                />
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="h-64 bg-slate-100 dark:bg-zinc-800 rounded-xl" />
              <div className="h-64 bg-slate-100 dark:bg-zinc-800 rounded-xl" />
            </div>
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </div>
  );
}
