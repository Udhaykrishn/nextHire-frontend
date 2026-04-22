"use client";

import { useQuery } from "@tanstack/react-query";
import { recruiterApi } from "@/lib/recruiter.api";
import { Recruiter } from "@/services/admin/recruiter-management.service";

interface DashboardClientProps {
  initialUserData?: Recruiter;
}

export function DashboardClient({ initialUserData }: DashboardClientProps) {
  const { data: userData, isLoading } = useQuery({
    queryKey: ["recruiter-profile"],
    queryFn: async () => {
      const { data } = await recruiterApi.get("/recruiter/profile");
      return data.data as Recruiter;
    },
    initialData: initialUserData,
  });

  if (isLoading && !userData) {
    return (
      <div className="flex flex-1 flex-col gap-4 animate-pulse">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={`dash-skeleton-${item}`}
              className="aspect-video rounded-xl bg-muted/50"
            />
          ))}
        </div>
        <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center p-6 flex-col gap-2">
          <span className="text-3xl font-bold">12</span>
          <span className="text-muted-foreground">Active Jobs</span>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center p-6 flex-col gap-2">
          <span className="text-3xl font-bold">48</span>
          <span className="text-muted-foreground">New Applicants</span>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center p-6 flex-col gap-2">
          <span className="text-3xl font-bold">5</span>
          <span className="text-muted-foreground">Interviews Scheduled</span>
        </div>
      </div>
      <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 p-6">
        <h2 className="text-lg font-semibold mb-4">
          Welcome, {userData?.name || "Recruiter"}
        </h2>
        <p className="text-muted-foreground">
          Your recruitment activity feed will appearing here.
        </p>
      </div>
    </div>
  );
}
