"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams as useSP } from "next/navigation";
import { RecruiterManagementService } from "@/services/admin/recruiter-management.service";
import { Skeleton } from "@/ui/skeleton";
import { RecruitersTabs } from "./recruiters-tabs";

export function RecruitersClient() {
  const searchParams = useSP();
  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 5;
  const search = searchParams?.get("search") || "";
  const status = searchParams?.get("status") || "active";

  const { data: recruiters, isLoading } = useQuery({
    queryKey: ["admin", "recruiters", page, limit, search, status],
    queryFn: () =>
      RecruiterManagementService.getAllRecruiters({
        page,
        limit,
        search,
        status,
      }),
  });

  if (isLoading) {
    return <Skeleton className="w-full h-[600px] rounded-2xl animate-pulse" />;
  }

  return (
    <RecruitersTabs
      recruitersData={recruiters ?? { data: [], total: 0, page: 0 }}
      currentStatus={status}
      currentPage={page}
      limit={limit}
      search={search}
    />
  );
}
