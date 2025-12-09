import { adminApi } from "@/lib/admin.api";

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    experience?: string;
    role_of_title?: string;
    status: string;
    resume_url?: string;
    bio?: string;
    badge: boolean;
    google_id?: string;
    createdAt?: string;
    profile_url?: {
        key: string;
        url: string;
    };
    subscription: {
        current_plan: string;
        is_subscribed: boolean;
    };
    social_link?: {
        linkedin?: string;
        portfolio?: string;
        github?: string;
    };
}

export interface PaginationResponse<T> {
    data: T[];
    page: number;
    total: number;
}

export const UserManagementService = {
    getAllUsers: async (params: { page?: number; limit?: number; search?: string }) => {
        const { data } = await adminApi.get("/user", { params });
        return data;
    },
    blockUnblockUser: async (userId: string) => {
        const { data } = await adminApi.patch(`/user/${userId}/block`);
        return data;
    }
};
