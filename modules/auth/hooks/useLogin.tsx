"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ForgotPasswordData,
  LoginFormData,
  SocialLoginData,
  UseLoginProps,
} from "../types";
import { loginSchema } from "../validation/login-schema.validation";
import { getAuthService } from "@/services/auth-service";
import { ROUTES, USER_ROLES, UserRole } from "@/constants";
import { redirect } from "../utils/redirect";
import { useAuthStore } from "@/stores/auth-store";

export const useLogin = ({
  role = "user",
  onLogin,
  onForgotPassword,
  onSocialLogin,
}: UseLoginProps) => {
  const router = useRouter();
  const { login } = useAuthStore();
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; root?: string }>({});

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
    try {
      const payload: LoginFormData = result.data;
      const { role: _, ...credentials } = payload;

      const authService = getAuthService(role as UserRole);
      console.log("is getting the credentials", credentials)
      const response = await authService.login(credentials);



      login(response.user);

      toast.success("Login successful!");

      const dashboardRoute = role === USER_ROLES.RECRUITER
        ? ROUTES.PROTECTED.RECRUITER_DASHBOARD
        : role === USER_ROLES.ADMIN
          ? ROUTES.PROTECTED.ADMIN_DASHBOARD
          : ROUTES.PROTECTED.USER_DASHBOARD;

      redirect(dashboardRoute);

    } catch (error: any) {
      console.error("Login failed:", error);
      const errorMessage = error.response?.data?.error.message || "login failed";
      toast.error(errorMessage);
      setErrors({
      });
    }
  };

  const handleSocialLogin = (provider: string) => {
    const payload: SocialLoginData = { provider, role };
    onSocialLogin?.(payload);
    console.log("Social login:", payload);
  };

  const handleForgotPassword = () => {
    const payload: ForgotPasswordData = { email: form.email, role: role as any };
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
  };
};
