"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ROUTES, USER_ROLES, UserRole } from "@/constants";
import { getAuthService } from "@/services/auth-service";
import { useAuthStore } from "@/stores/auth-store";
import {
  ForgotPasswordData,
  LoginFormData,
  SocialLoginData,
  UseLoginProps,
} from "../types";
import { redirect } from "../utils/redirect";
import { loginSchema } from "../validation/login-schema.validation";

type ApiError = {
  response?: {
    data?: {
      error: {
        message: string;
      };
    };
  };
};

export const useLogin = ({
  role = "user",
  // onLogin, // Unused
  onForgotPassword,
  onSocialLogin,
}: UseLoginProps) => {
  const _router = useRouter();
  const { login } = useAuthStore();
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    root?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const result = loginSchema.safeParse({ ...form, role });
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors?.[0],
        password: formattedErrors.password?._errors?.[0],
      });
      return;
    }
    setErrors({});
    setIsLoading(true); // Start loading
    let dashboardRoute: string | null = null;
    try {
      const payload: LoginFormData = result.data;
      const { role: _, ...credentials } = payload;

      const authService = getAuthService(role as UserRole);
      console.log("is getting the credentials", credentials);
      const response = await authService.login(credentials);

      login(response.user);

      toast.success("Login successful!");

      dashboardRoute =
        role === USER_ROLES.RECRUITER
          ? ROUTES.PROTECTED.RECRUITER_DASHBOARD
          : role === USER_ROLES.ADMIN
            ? ROUTES.PROTECTED.ADMIN_DASHBOARD
            : ROUTES.PROTECTED.USER_DASHBOARD;
    } catch (err) {
      console.error("Login failed:", err);
      const error = err as ApiError;
      const errorMessage =
        error.response?.data?.error.message || "login failed";
      toast.error(errorMessage);
      setErrors({});
    } finally {
      setIsLoading(false); // Stop loading
    }

    if (dashboardRoute) {
      redirect(dashboardRoute);
    }
  };

  // ... (rest of the file)

  const handleSocialLogin = (provider: string) => {
    const payload: SocialLoginData = { provider, role };
    onSocialLogin?.(payload);
    console.log("Social login:", payload);
  };

  const handleForgotPassword = () => {
    const payload: ForgotPasswordData = {
      email: form.email,
      role: role as UserRole,
    };
    onForgotPassword?.(payload);
    console.log("Forgot password:", payload);
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return {
    form,
    setForm,
    handleChange,
    showPassword,
    togglePassword,
    handleSubmit,
    handleSocialLogin,
    handleForgotPassword,
    errors,
    isLoading,
  };
};
