import { API_ROUTES } from "@/constants/api-routes";
import { recruiterApi } from "@/lib/recruiter.api";
import { SignupPayload } from "@/modules/auth/hooks/useSignup";
import { LoginFormData, ResetPasswordData } from "@/modules/auth/types";
import { Recruiter } from "@/types/recruiter";

export interface AuthResponse {
  accessToken: string;
  sessionId: string;
  user: Recruiter;
}

export const RecruiterAuthService = {
  login: async (data: Omit<LoginFormData, "role">): Promise<AuthResponse> => {
    const response = await recruiterApi.post<AuthResponse>(
      API_ROUTES.AUTH.RECRUITER.LOGIN,
      data,
    );
    return response.data;
  },

  signup: async (
    data: Omit<SignupPayload, "role" | "confirmPassword">,
  ): Promise<AuthResponse> => {
    const response = await recruiterApi.post<AuthResponse>(
      API_ROUTES.AUTH.RECRUITER.SIGNUP,
      data,
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await recruiterApi.post(API_ROUTES.AUTH.RECRUITER.LOGOUT);
  },

  verifyOtp: async (data: {
    email: string;
    otp: string;
  }): Promise<AuthResponse> => {
    const response = await recruiterApi.post<AuthResponse>(
      API_ROUTES.AUTH.RECRUITER.OTP_VERIFY,
      data,
    );
    return response.data;
  },

  resendOtp: async (data: { email: string }): Promise<{ otp: string }> => {
    const response = await recruiterApi.post<{ otp: string }>(
      API_ROUTES.AUTH.RECRUITER.RESEND_OTP,
      data,
    );
    return response.data;
  },

  forgotPassword: async (data: { email: string }) => {
    const response = await recruiterApi.post<{ message: string }>(
      API_ROUTES.AUTH.RECRUITER.FORGOT_PASSWORD,
      data,
    );
    return response.data;
  },

  resetPassword: async (data: ResetPasswordData) => {
    const response = await recruiterApi.post(
      API_ROUTES.AUTH.RECRUITER.RESET_PASSWORD,
      data,
    );
    return response.data;
  },

  verifyResetToken: async (token: string): Promise<boolean> => {
    try {
      await recruiterApi.post(API_ROUTES.AUTH.RECRUITER.VERIFY_RESET_TOKEN, {
        token,
      });
      return true;
    } catch (_error) {
      return false;
    }
  },
};
