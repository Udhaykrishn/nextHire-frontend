"use client";

import { Briefcase, Filter, Search } from "lucide-react";
import { useState } from "react";
import { JobCard } from "@/modules/users/components/jobs/job-card";
import { useJobs } from "@/modules/users/hooks/use-jobs";
import { Button } from "@/ui/button";

export function JobsClient() {
  const [search, setSearch] = useState("");
  const { jobs, isLoading } = useJobs(search);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Browse Jobs</h1>
          <p className="text-muted-foreground">
            Find your perfect job opportunity
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs by title, company, or keyword..."
            className="w-full rounded-lg border bg-background px-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border-border/60"
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 h-auto text-base shadow-sm shadow-blue-200 dark:shadow-none">
          Search
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={`job-skeleton-${item}`}
              className="h-32 bg-muted animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-2xl bg-muted/10">
          <Briefcase className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-xl font-semibold">No jobs found</h3>
          <p className="text-muted-foreground max-w-sm mt-2">
            We couldn't find any jobs matching your search. Try adjusting your
            keywords or filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
