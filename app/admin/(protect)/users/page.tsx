import { UserManagementService } from "@/services/admin/user-management.service";
import { UsersTable } from "@/modules/users/components/users-table";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
    }>;
}

const USERS_PER_PAGE = 3;

export default async function UsersPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1;
    const search = searchParams.search || "";

    try {
        const { data: users } = await UserManagementService.getAllUsers({
            page,
            limit: USERS_PER_PAGE,
            search,
        });

        return (
            <UsersTable
                users={users.data}
                total={users.total}
                page={page}
                currentPage={users.page}
            />
        );
    } catch (error) {
        console.error("Error fetching users:", error);

        return (
            <UsersTable
                users={[]}
                total={0}
                page={page}
                currentPage={0}
            />
        );
    }
}