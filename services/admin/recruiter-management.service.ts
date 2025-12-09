import { adminApi } from "@/lib/admin.api";

export interface Recruiter {
    id: string;
    name: string;
    email: string;
    phone: string;
    company_name: string;
    GSTIN?: string;
    status: string;
    website_link?: string;
    description?: string;
    category?: string;
    company_role?: string;
    is_verified_company: boolean;
    admin_approved: boolean;
    createdAt: string;
    updatedAt?: string | null;
    profile_url?: {
        key: string;
        url: string;
    };
    subscription: {
        current_plan: string;
        is_subscribed: boolean;
        _id?: string;
    };
}

export interface PaginationResponse<T> {
    data: T[];
    page: number;
    total: number;
}

export const RecruiterManagementService = {
    getAllRecruiters: async (params: { page?: number; limit?: number; search?: string; status?: string }) => {
        const { data } = await adminApi.get("/recruiter", { params });
        return data;
    },
    blockUnblockRecruiter: async (recruiterId: string) => {
        const { data } = await adminApi.patch(`/recruiter/${recruiterId}/block`);
        return data;
    }
};
