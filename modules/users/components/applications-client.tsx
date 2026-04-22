"use client";

import { format } from "date-fns";
import { Briefcase, Building2, Calendar } from "lucide-react";
import Image from "next/image";
import { useApplications } from "@/modules/users/hooks/use-applications";
import { Badge } from "@/ui/badge";

const STATUS_CONFIG = {
  applied: {
    label: "Applied",
    class: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  },
  interviewing: {
    label: "Interviewing",
    class: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  rejected: {
    label: "Rejected",
    class: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  offered: {
    label: "Offer Received",
    class:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  withdrawn: {
    label: "Withdrawn",
    class:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
};

export function ApplicationsClient() {
  const { applications, isLoading } = useApplications();

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-muted rounded w-64 mb-6" />
        {[1, 2, 3].map((item) => (
          <div
            key={`app-skeleton-${item}`}
            className="h-48 bg-muted rounded-xl w-full"
          />
        ))}
      </div>
    );
  }

  const activeCount = applications.filter((app) =>
    ["applied", "interviewing"].includes(app.status),
  ).length;

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Applications</h1>
        <div className="flex gap-2">
          <Badge variant="outline">Total: {applications.length}</Badge>
          <Badge variant="outline" className="text-blue-600 font-medium">
            Active: {activeCount}
          </Badge>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-2xl bg-muted/10">
          <Briefcase className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-xl font-semibold">No applications yet</h3>
          <p className="text-muted-foreground max-w-sm mt-2">
            You haven't applied to any jobs yet. Start exploring opportunities
            that match your skills!
          </p>
          <button
            type="button"
            onClick={() => window.location.assign("/users/jobs")}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Jobs
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => {
            const status = STATUS_CONFIG[app.status] || STATUS_CONFIG.applied;
            return (
              <div
                key={app._id}
                className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all border-border/60 hover:border-blue-200 dark:hover:border-blue-800"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center text-xl font-bold overflow-hidden border">
                      {app.companyLogo ? (
                        <Image
                          src={app.companyLogo}
                          alt={app.companyName}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>{app.companyName[0]}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{app.jobTitle}</h3>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-muted-foreground font-medium">
                        <span className="flex items-center gap-1.5 text-foreground/80">
                          <Building2 className="h-4 w-4" />
                          {app.companyName}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          Applied on{" "}
                          {format(new Date(app.appliedAt), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${status.class}`}
                  >
                    {status.label}
                  </span>
                </div>
                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    className="flex-1 rounded-xl border border-border/80 bg-background py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-xl bg-blue-600 text-white py-2.5 text-sm font-semibold hover:bg-blue-700 shadow-sm shadow-blue-200 dark:shadow-none transition-colors"
                  >
                    Check Status
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
