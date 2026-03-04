export const dynamic = "force-dynamic";

import { RecruiterManagementService } from "@/services/admin/recruiter-management.service";
import { RecruitersTabs } from "./recruiters-tabs";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
  }>;
}

export default async function RecruitersPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 5;
  const search = searchParams.search || "";
  const status = searchParams.status || "active";

  try {
    const { data: recruiters } =
      await RecruiterManagementService.getAllRecruiters({
        page,
        limit,
        search,
        status,
      });

    return (
      <RecruitersTabs
        recruitersData={recruiters}
        currentStatus={status}
        currentPage={page}
        limit={limit}
        search={search}
      />
    );
  } catch (error) {
    console.error("Error fetching recruiters:", error);

    return (
      <RecruitersTabs
        recruitersData={{ data: [], total: 0, page: 0 }}
        currentStatus={status}
        currentPage={page}
        limit={limit}
        search={search}
      />
    );
  }
}
