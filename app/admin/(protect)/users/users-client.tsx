"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams as useSP } from "next/navigation";
import { UsersTable } from "@/modules/users/components/users-table";
import { UserManagementService } from "@/services/admin/user-management.service";

const USERS_PER_PAGE = 5;

export function UsersClient() {
  const searchParams = useSP();
  const page = Number(searchParams?.get("page")) || 1;
  const search = searchParams?.get("search") || "";

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin", "users", page, search],
    queryFn: () =>
      UserManagementService.getAllUsers({
        page,
        limit: USERS_PER_PAGE,
        search,
      }),
  });

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-muted rounded w-48" />
        <div className="h-[400px] bg-muted rounded-xl w-full" />
      </div>
    );
  }

  return (
    <UsersTable
      users={users?.data ?? []}
      total={users?.total ?? 0}
      page={page}
      currentPage={users?.page ?? 0}
    />
  );
}
