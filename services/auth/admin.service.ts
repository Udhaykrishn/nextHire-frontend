import { LoginFormData } from "@/modules/auth/types";
import { adminApi } from "@/lib/admin.api";
import { API_ROUTES } from "@/constants/api-routes";
import { AuthResponse } from "./user.service";
import { SignupPayload } from "@/modules/auth/hooks/useSignup";

export const AdminAuthService = {
    login: async (data: Omit<LoginFormData, 'role'>): Promise<AuthResponse> => {
        const response = await adminApi.post<AuthResponse>(API_ROUTES.AUTH.ADMIN.LOGIN, data);
        return response.data;
    },

    signup: async (data: Omit<SignupPayload, 'role' | 'confirmPassword'>): Promise<AuthResponse> => {
        const response = await adminApi.post<AuthResponse>(API_ROUTES.AUTH.ADMIN.SIGNUP, data);
        return response.data;
    },

    logout: async (): Promise<void> => {
        await adminApi.post(API_ROUTES.AUTH.ADMIN.LOGOUT);
    },

    verifyOtp: async (data: { email: string; otp: string }): Promise<AuthResponse> => {
        const response = await adminApi.post<AuthResponse>(API_ROUTES.AUTH.ADMIN.OTP_VERIFY, data);
        return response.data;
    },

    resendOtp: async (data: { email: string }): Promise<{ otp: string }> => {
        const response = await adminApi.post<{ otp: string }>(API_ROUTES.AUTH.ADMIN.RESEND_OTP, data);
        return response.data;
    }
};
