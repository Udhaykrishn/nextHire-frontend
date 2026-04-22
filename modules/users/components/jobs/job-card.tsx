"use client";

import { formatDistanceToNow } from "date-fns";
import { Bookmark, Briefcase, Clock, DollarSign, MapPin } from "lucide-react";
import Image from "next/image";
import { Job } from "@/services/job.service";
import { Badge } from "@/ui/badge";

export function JobCard({ job }: { job: Job }) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all border-border/60 hover:border-blue-200 dark:hover:border-blue-800 cursor-pointer group">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center text-xl font-bold overflow-hidden border">
            {job.logo ? (
              <Image
                src={job.logo}
                alt={job.company}
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{job.company[0]}</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              {job.isNew && (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-2 h-5 text-[10px] uppercase font-bold">
                  New
                </Badge>
              )}
            </div>
            <p className="text-foreground/80 font-medium">{job.company}</p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-muted-foreground/70" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-muted-foreground/70" />
                {job.type}
              </span>
              <span className="flex items-center gap-1.5 text-foreground/90">
                <DollarSign className="h-4 w-4 text-green-600" />
                {job.salary}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <button
            type="button"
            className="text-muted-foreground hover:text-blue-600 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors"
          >
            <Bookmark className="h-5 w-5" />
          </button>
          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mt-6 flex-wrap">
        {job.tags.slice(0, 4).map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-muted/50 hover:bg-muted text-foreground/70 font-medium border-none"
          >
            {tag}
          </Badge>
        ))}
        {job.tags.length > 4 && (
          <span className="text-xs text-muted-foreground flex items-center">
            +{job.tags.length - 4} more
          </span>
        )}
      </div>
    </div>
  );
}
