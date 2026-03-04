"use client";

import { useEffect, useState } from "react";
import { recruiterApi } from "@/lib/recruiter.api";
import { IApiError } from "@/types/api-error";
import { Recruiter } from "@/types/recruiter";

interface DashboardClientProps {
  initialUserData?: Recruiter;
}

export function DashboardClient({ initialUserData }: DashboardClientProps) {
  const [userData, setUserData] = useState<Recruiter | undefined>(
    initialUserData,
  );
  const [loading, setLoading] = useState(!initialUserData);

  useEffect(() => {
    if (initialUserData) return;

    async function fetchProfile() {
      try {
        const { data } = await recruiterApi.get("/recruiter/profile");
        setUserData(data.data);
      } catch (err) {
        const error = err as IApiError;
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [initialUserData]);

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-4 animate-pulse">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video rounded-xl bg-muted/50" />
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
