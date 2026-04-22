import { API_ROUTES } from "@/constants/api-routes";
import { userApi } from "@/lib/user.api";
import { SignupPayload } from "@/modules/auth/hooks/useSignup";
import { LoginFormData, ResetPasswordData } from "@/modules/auth/types";
import { User } from "@/types/user";

export interface AuthResponse {
  accessToken: string;
  sessionId: string;
  user: User;
}
export const UserAuthService = {
  login: async (data: Omit<LoginFormData, "role">): Promise<AuthResponse> => {
    const response = await userApi.post<AuthResponse>(
      API_ROUTES.AUTH.USER.LOGIN,
      data,
    );
    return response.data;
  },

  signup: async (
    data: Omit<SignupPayload, "role" | "confirmPassword">,
  ): Promise<AuthResponse> => {
    const response = await userApi.post<AuthResponse>(
      API_ROUTES.AUTH.USER.SIGNUP,
      data,
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await userApi.post(API_ROUTES.AUTH.USER.LOGOUT);
  },

  verifyOtp: async (data: {
    email: string;
    otp: string;
  }): Promise<AuthResponse> => {
    const response = await userApi.post<AuthResponse>(
      API_ROUTES.AUTH.USER.OTP_VERIFY,
      data,
    );
    return response.data;
  },

  resendOtp: async (data: { email: string }): Promise<{ otp: string }> => {
    const response = await userApi.post<{ otp: string }>(
      API_ROUTES.AUTH.USER.RESEND_OTP,
      data,
    );
    return response.data;
  },

  forgotPassword: async (data: { email: string }) => {
    const response = await userApi.post<{ message: string }>(
      API_ROUTES.AUTH.USER.FORGOT_PASSWORD,
      data,
    );
    return response.data;
  },

  resetPassword: async (data: ResetPasswordData) => {
    const response = await userApi.post(
      API_ROUTES.AUTH.USER.RESET_PASSWORD,
      data,
    );
    return response.data;
  },

  verifyResetToken: async (token: string): Promise<boolean> => {
    try {
      await userApi.post(API_ROUTES.AUTH.USER.VERIFY_RESET_TOKEN, { token });
      return true;
    } catch (_error) {
      return false;
    }
  },

  updateSubscription: async (data: {
    subscription: { current_plan: string; is_subscribed: boolean };
  }) => {
    const response = await userApi.patch("/user/subscription/upgrade", data);
    return response.data;
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await userApi.patch<{ data: User }>("/user/update", data);
    return response.data;
  },
  uploadResume: async (file: File) => {
    const formData = new FormData();
    formData.append("resume", file);
    const response = await userApi.post<User>(
      "/user/profile/resume/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },
  deleteResume: async () => {
    const response = await userApi.delete<User>("/user/profile/resume/upload");
    return response.data;
  },
  getProfile: async (): Promise<User> => {
    const response = await userApi.get<User>("/user/profile");
    return response.data;
  },
};
