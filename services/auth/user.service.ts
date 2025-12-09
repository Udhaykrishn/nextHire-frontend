import { LoginFormData } from "@/modules/auth/types";
import { userApi } from "@/lib/user.api";
import { API_ROUTES } from "@/constants/api-routes";
import { SignupPayload } from "@/modules/auth/hooks/useSignup";

export interface AuthResponse {
    accessToken: string;
    sessionId: string;
    user: any;
}
export const UserAuthService = {
    login: async (data: Omit<LoginFormData, 'role'>): Promise<AuthResponse> => {
        const response = await userApi.post<AuthResponse>(API_ROUTES.AUTH.USER.LOGIN, data);
        return response.data;
    },

    signup: async (data: Omit<SignupPayload, 'role' | 'confirmPassword'>): Promise<AuthResponse> => {
        const response = await userApi.post<AuthResponse>(API_ROUTES.AUTH.USER.SIGNUP, data);
        return response.data;
    },

    logout: async (): Promise<void> => {
        await userApi.post(API_ROUTES.AUTH.USER.LOGOUT);
    },

    verifyOtp: async (data: { email: string; otp: string }): Promise<AuthResponse> => {
        const response = await userApi.post<AuthResponse>(API_ROUTES.AUTH.USER.OTP_VERIFY, data);
        return response.data;
    },

    resendOtp: async (data: { email: string }): Promise<{ otp: string }> => {
        const response = await userApi.post<{ otp: string }>(API_ROUTES.AUTH.USER.RESEND_OTP, data);
        return response.data;
    }
};
