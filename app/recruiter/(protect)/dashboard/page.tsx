import { DashboardClient } from './dashboard-client';
import { recruiterApi } from '@/lib/recruiter.api';

export default async function Page() {
    try {
        const { data } = await recruiterApi.get("/recruiter/profile");
        return <DashboardClient usersData={data.data} />;
    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error("Dashboard page fetch error:", error);
        return <DashboardClient />;
    }
}