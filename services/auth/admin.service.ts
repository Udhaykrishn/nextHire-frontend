import { API_ROUTES } from "@/constants/api-routes";
import { adminApi } from "@/lib/admin.api";
import { SignupPayload } from "@/modules/auth/hooks/useSignup";
import { LoginFormData, ResetPasswordData } from "@/modules/auth/types";
import { AuthResponse } from "./user.service";

export const AdminAuthService = {
  login: async (data: Omit<LoginFormData, "role">): Promise<AuthResponse> => {
    const response = await adminApi.post<AuthResponse>(
      API_ROUTES.AUTH.ADMIN.LOGIN,
      data,
    );
    return response.data;
  },

  signup: async (
    data: Omit<SignupPayload, "role" | "confirmPassword">,
  ): Promise<AuthResponse> => {
    const response = await adminApi.post<AuthResponse>(
      API_ROUTES.AUTH.ADMIN.SIGNUP,
      data,
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await adminApi.post(API_ROUTES.AUTH.ADMIN.LOGOUT);
  },

  verifyOtp: async (data: {
    email: string;
    otp: string;
  }): Promise<AuthResponse> => {
    const response = await adminApi.post<AuthResponse>(
      API_ROUTES.AUTH.ADMIN.OTP_VERIFY,
      data,
    );
    return response.data;
  },

  resendOtp: async (data: { email: string }): Promise<{ otp: string }> => {
    const response = await adminApi.post<{ otp: string }>(
      API_ROUTES.AUTH.ADMIN.RESEND_OTP,
      data,
    );
    return response.data;
  },

  forgotPassword: async (_data: { email: string }) => {
    throw new Error("Not implemented for admin");
  },

  resetPassword: async (_data: ResetPasswordData) => {
    throw new Error("Not implemented for admin");
  },

  verifyResetToken: async (_token: string) => {
    throw new Error("Not implemented for admin");
  },
};
