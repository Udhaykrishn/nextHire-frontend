"use client";

import { Eye, ShieldAlert, ShieldCheck } from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams as useSP,
} from "next/navigation";
import { Suspense } from "react";
import { ConfirmModal } from "@/components/common/confirm-modal";
import {
  type Action,
  type Column,
  DataTable,
} from "@/components/common/data-table";
import { DataPagination } from "@/components/common/pagination";
import { type Recruiter } from "@/services/admin/recruiter-management.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { useRecruiterActions } from "../hooks/use-recruiter-actions";
import { useRecruiterDetails } from "../hooks/use-recruiter-details";
import { RecruiterDetailsModal } from "./recruiter-details-modal";

interface RecruitersTableProps {
  recruiters: Recruiter[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  currentStatus: string;
}

function RecruitersTableContent({
  recruiters,
  total,
  page,
  totalPages,
  limit,
  currentStatus,
}: RecruitersTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSP();
  const {
    isLoading,
    confirm,
    openConfirmModal,
    closeConfirmModal,
    confirmBlockUnblock,
  } = useRecruiterActions();
  const { selectedRecruiter, isModalOpen, openDetailsModal, setIsModalOpen } =
    useRecruiterDetails();

  const isBlocked = (status: string) => status === "blocked";

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const columns: Column<Recruiter>[] = [
    {
      header: "Recruiter",
      accessor: (recruiter) => (
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10 ring-2 ring-background">
            <AvatarImage
              src={recruiter.profile_url?.url}
              alt={recruiter.name}
            />
            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-medium">
              {recruiter.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{recruiter.name}</p>
            <p className="text-sm text-muted-foreground">{recruiter.email}</p>
          </div>
        </div>
      ),
      className: "px-6 py-5",
    },
    {
      header: "Status",
      accessor: (recruiter) => (
        <Badge
          variant={
            recruiter.status === "active"
              ? "default"
              : recruiter.status === "blocked"
                ? "destructive"
                : "secondary"
          }
          className={
            recruiter.status === "active"
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              : recruiter.status === "blocked"
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : ""
          }
        >
          {recruiter.status === "active"
            ? "Active"
            : recruiter.status === "blocked"
              ? "Blocked"
              : recruiter.status}
        </Badge>
      ),
      className: "px-6 py-5",
    },
    {
      header: "Joined",
      accessor: (recruiter) =>
        new Date(recruiter.createdAt).toISOString().split("T")[0],
      className: "px-6 py-5 text-muted-foreground",
    },
  ];

  const actions: Action<Recruiter>[] = [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: (recruiter) => openDetailsModal(recruiter),
    },
    {
      label: (recruiter) =>
        isBlocked(recruiter.status) ? "Unblock Recruiter" : "Block Recruiter",
      icon: (recruiter) =>
        isBlocked(recruiter.status) ? (
          <ShieldCheck className="h-4 w-4 text-green-600" />
        ) : (
          <ShieldAlert className="h-4 w-4 text-red-600" />
        ),
      onClick: (recruiter) => openConfirmModal(recruiter),
      className: (recruiter) =>
        isBlocked(recruiter.status) ? "" : "text-red-600",
    },
  ];

  const emptyMessage =
    currentStatus === "pending"
      ? "No pending recruiters found."
      : "No active recruiters found.";

  return (
    <>
      <div className="space-y-6">
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <DataTable
            data={recruiters}
            columns={columns}
            actions={actions}
            emptyMessage={emptyMessage}
            getRowKey={(recruiter) => recruiter.id}
            isLoading={isLoading}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <DataPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={limit}
            totalItems={total}
          />
        )}
      </div>

      {/* Details Modal */}
      <RecruiterDetailsModal
        recruiter={selectedRecruiter}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      {/* Confirm Modal */}
      {confirm.recruiter && (
        <ConfirmModal
          open={confirm.open}
          onOpenChange={(open) => !open && closeConfirmModal()}
          title={
            isBlocked(confirm.recruiter.status)
              ? "Unblock Recruiter"
              : "Block Recruiter"
          }
          description={`Are you sure you want to ${isBlocked(confirm.recruiter.status) ? "unblock" : "block"} "${confirm.recruiter.name}"?`}
          confirmText={
            isBlocked(confirm.recruiter.status) ? "Unblock" : "Block"
          }
          onConfirm={confirmBlockUnblock}
        />
      )}
    </>
  );
}

export function RecruitersTable(props: RecruitersTableProps) {
  return (
    <Suspense>
      <RecruitersTableContent {...props} />
    </Suspense>
  );
}
