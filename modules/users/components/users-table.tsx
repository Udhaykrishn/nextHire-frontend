"use client";

import { Award, Eye, Search, ShieldAlert, ShieldCheck } from "lucide-react";
import { ConfirmModal } from "@/components/common/confirm-modal";
import {
  type Action,
  type Column,
  DataTable,
} from "@/components/common/data-table";
import { DataPagination } from "@/components/common/pagination";
import { type User } from "@/services/admin/user-management.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Input } from "@/ui/input";
import { useUserActions } from "../hooks/use-user-actions";
import { useUserDetails } from "../hooks/use-user-details";
import { useUserSearch } from "../hooks/use-user-search";
import { UserDetailsSheet } from "./user-details-sheet";

const USERS_PER_PAGE = 6;

interface UsersTableProps {
  users: User[];
  total: number;
  page: number;
  currentPage: number;
}

export function UsersTable({
  users,
  total,
  page,
  currentPage,
}: UsersTableProps) {
  const {
    isLoading,
    confirm,
    openConfirmModal,
    closeConfirmModal,
    confirmBlockUnblock,
  } = useUserActions();
  const { handleSearch, setPage } = useUserSearch();
  const { selectedUser, isModalOpen, openDetailsModal, setIsModalOpen } =
    useUserDetails();

  const totalPages = currentPage;
  const isBlocked = (status: string) => status === "block";

  const columns: Column<User>[] = [
    {
      header: "User",
      accessor: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 ring-2 ring-background shadow-sm">
            <AvatarImage src={user.profile_url?.url} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-medium text-xs">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <p className="font-medium text-sm leading-none">{user.name}</p>
              {user.badge && (
                <Award className="h-3 w-3 text-blue-500 fill-blue-50" />
              )}
            </div>
            {user.role_of_title && (
              <p className="text-xs text-muted-foreground mt-1">
                {user.role_of_title}
              </p>
            )}
          </div>
        </div>
      ),
      className: "px-4 py-3 min-w-[200px]",
    },
    {
      header: "Email",
      accessor: "email",
      className: "px-4 py-3 text-sm text-muted-foreground hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: (user) => user.phone || "—",
      className: "px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell",
    },
    {
      header: "Plan",
      accessor: (user) => (
        <Badge variant="outline" className="capitalize bg-muted/50 font-normal">
          {user.subscription?.current_plan || "Free"}
        </Badge>
      ),
      className: "px-4 py-3 hidden xl:table-cell",
    },
    {
      header: "Status",
      accessor: (user) => (
        <Badge
          variant={isBlocked(user.status) ? "destructive" : "secondary"}
          className={
            isBlocked(user.status)
              ? "bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
          }
        >
          {isBlocked(user.status) ? "Blocked" : "Active"}
        </Badge>
      ),
      className: "px-4 py-3",
    },
  ];

  const actions: Action<User>[] = [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: (user) => openDetailsModal(user),
    },
    {
      label: (user) => (isBlocked(user.status) ? "Unblock User" : "Block User"),
      icon: (user) =>
        isBlocked(user.status) ? (
          <ShieldCheck className="h-4 w-4 text-green-600" />
        ) : (
          <ShieldAlert className="h-4 w-4 text-red-600" />
        ),
      onClick: (user) => openConfirmModal(user),
      className: (user) => (isBlocked(user.status) ? "" : "text-red-600"),
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Users</h2>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <DataTable
            data={users}
            columns={columns}
            actions={actions}
            emptyMessage="No users found"
            getRowKey={(user) => user.id}
            isLoading={isLoading}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <DataPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            itemsPerPage={USERS_PER_PAGE}
            totalItems={total}
          />
        )}
      </div>

      {/* Details Sheet */}
      <UserDetailsSheet
        user={selectedUser}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onBlockToggle={openConfirmModal}
      />

      {/* Confirm Modal */}
      {confirm.user && (
        <ConfirmModal
          open={confirm.open}
          onOpenChange={(open) => !open && closeConfirmModal()}
          title={isBlocked(confirm.user.status) ? "Unblock User" : "Block User"}
          description={`Are you sure you want to ${isBlocked(confirm.user.status) ? "unblock" : "block"} "${confirm.user.name}"?`}
          confirmText={isBlocked(confirm.user.status) ? "Unblock" : "Block"}
          onConfirm={confirmBlockUnblock}
        />
      )}
    </>
  );
}
