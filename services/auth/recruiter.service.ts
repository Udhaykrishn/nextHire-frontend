import { recruiterApi } from "@/lib/recruiter.api";
import { API_ROUTES } from '@/constants/api-routes';
import { LoginFormData } from '@/modules/auth/types';
import { SignupPayload } from '@/modules/auth/hooks/useSignup';

export interface AuthResponse {
    accessToken: string;
    sessionId: string;
    user: any;
}

export const RecruiterAuthService = {
    login: async (data: Omit<LoginFormData, 'role'>): Promise<AuthResponse> => {
        const response = await recruiterApi.post<AuthResponse>(API_ROUTES.AUTH.RECRUITER.LOGIN, data);
        return response.data;
    },

    signup: async (data: Omit<SignupPayload, 'role'>): Promise<AuthResponse> => {
        const response = await recruiterApi.post<AuthResponse>(API_ROUTES.AUTH.RECRUITER.SIGNUP, data);
        return response.data;
    },

    logout: async (): Promise<void> => {
        await recruiterApi.post(API_ROUTES.AUTH.RECRUITER.LOGOUT);
    },

    verifyOtp: async (data: { email: string; otp: string }): Promise<AuthResponse> => {
        const response = await recruiterApi.post<AuthResponse>(API_ROUTES.AUTH.RECRUITER.OTP_VERIFY, data);
        return response.data;
    },

    resendOtp: async (data: { email: string }): Promise<{ otp: string }> => {
        const response = await recruiterApi.post<{ otp: string }>(API_ROUTES.AUTH.RECRUITER.RESEND_OTP, data);
        return response.data;
    }
};
