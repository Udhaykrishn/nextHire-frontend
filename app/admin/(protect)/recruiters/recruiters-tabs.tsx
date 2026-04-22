"use client";

import {
  usePathname,
  useRouter,
  useSearchParams as useSP,
} from "next/navigation";
import { Suspense } from "react";
import { RecruiterSearch } from "@/modules/recruiter/components/recruiter-search-pagination";
import { RecruitersTable } from "@/modules/recruiter/components/recruiters-table";
import { type Recruiter } from "@/services/admin/recruiter-management.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

interface RecruiterData {
  data: Recruiter[];
  total: number;
  page: number;
}

interface RecruitersTabsProps {
  recruitersData: RecruiterData;
  currentStatus: string;
  currentPage: number;
  limit: number;
  search: string;
}

function RecruitersTabsContent({
  recruitersData,
  currentStatus,
  currentPage,
  limit,
  search,
}: RecruitersTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSP();

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("status", value);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs
      value={currentStatus}
      onValueChange={handleTabChange}
      className="w-full"
    >
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="active">Active Recruiters</TabsTrigger>
        <TabsTrigger value="pending">Pending Recruiters</TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="mt-6 space-y-4">
        {currentStatus === "active" && (
          <>
            <div className="flex items-center justify-between">
              <RecruiterSearch defaultValue={search} />
            </div>
            <RecruitersTable
              recruiters={recruitersData.data}
              total={recruitersData.total}
              page={currentPage}
              totalPages={recruitersData.page}
              limit={limit}
              currentStatus="active"
            />
          </>
        )}
      </TabsContent>

      <TabsContent value="pending" className="mt-6 space-y-4">
        {currentStatus === "pending" && (
          <>
            <div className="flex items-center justify-between">
              <RecruiterSearch defaultValue={search} />
            </div>
            <RecruitersTable
              recruiters={recruitersData.data}
              total={recruitersData.total}
              page={currentPage}
              totalPages={recruitersData.page}
              limit={limit}
              currentStatus="pending"
            />
          </>
        )}
      </TabsContent>
    </Tabs>
  );
}

export function RecruitersTabs(props: RecruitersTabsProps) {
  return (
    <Suspense>
      <RecruitersTabsContent {...props} />
    </Suspense>
  );
}
