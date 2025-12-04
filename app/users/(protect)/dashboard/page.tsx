import { userApi } from '@/lib/user.api';
import { DashboardClient } from './dashboard-client';

export default async function Page() {
    try {
        const { data } = await userApi.get("/user", { params: { page: 1, limit: 10 } });
        console.log(data);
        return <DashboardClient usersData={data} />;
    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error("Dashboard page fetch error:", error);
        return <DashboardClient />;
    }
}