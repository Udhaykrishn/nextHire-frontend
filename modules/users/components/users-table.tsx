"use client";

import { type User } from "@/services/admin/user-management.service";
import { Input } from "@/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Search, ShieldCheck, ShieldAlert, Eye } from "lucide-react";
import { DataTable, type Column, type Action } from "@/components/common/data-table";
import { ConfirmModal } from "@/components/common/confirm-modal";
import { DataPagination } from "@/components/common/pagination";
import { UserDetailsModal } from "./user-details-modal";
import { useUserActions } from "../hooks/use-user-actions";
import { useUserSearch } from "../hooks/use-user-search";
import { useUserDetails } from "../hooks/use-user-details";

const USERS_PER_PAGE = 6;

interface UsersTableProps {
    users: User[];
    total: number;
    page: number;
    currentPage: number;
}

export function UsersTable({ users, total, page, currentPage }: UsersTableProps) {
    const { isLoading, confirm, openConfirmModal, closeConfirmModal, confirmBlockUnblock } = useUserActions();
    const { handleSearch, setPage } = useUserSearch();
    const { selectedUser, isModalOpen, openDetailsModal, setIsModalOpen } = useUserDetails();

    const totalPages = currentPage;
    const isBlocked = (status: string) => status === "block";

    const columns: Column<User>[] = [
        {
            header: "User",
            accessor: (user) => (
                <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 ring-2 ring-background">
                        <AvatarImage src={user.profile_url?.url} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-medium">
                            {user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </div>
            ),
            className: "px-6 py-5",
        },
        {
            header: "Status",
            accessor: (user) => (
                <Badge
                    variant={isBlocked(user.status) ? "destructive" : "default"}
                    className={
                        isBlocked(user.status)
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    }
                >
                    {isBlocked(user.status) ? "Blocked" : "Active"}
                </Badge>
            ),
            className: "px-6 py-5",
        },
        {
            header: "Phone",
            accessor: "phone",
            className: "px-6 py-5 text-muted-foreground",
        },
    ];

    const actions: Action<User>[] = [
        {
            label: "View Details",
            icon: <Eye className="h-4 w-4" />,
            onClick: (user) => openDetailsModal(user),
        },
        {
            label: (user) => isBlocked(user.status) ? "Unblock User" : "Block User",
            icon: (user) => isBlocked(user.status)
                ? <ShieldCheck className="h-4 w-4 text-green-600" />
                : <ShieldAlert className="h-4 w-4 text-red-600" />,
            onClick: (user) => openConfirmModal(user),
            className: (user) => isBlocked(user.status) ? "" : "text-red-600",
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

            {/* Details Modal */}
            <UserDetailsModal
                user={selectedUser}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
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
