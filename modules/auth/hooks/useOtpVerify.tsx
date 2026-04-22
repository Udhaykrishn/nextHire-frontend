"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ROUTES, USER_ROLES, UserRole } from "@/constants";
import { getAuthService } from "@/services/auth-service";
import { IApiError } from "@/types/api-error";

interface UseOtpVerifyProps {
  email: string;
  role?: string;
}

export const useOtpVerify = ({ email, role = "user" }: UseOtpVerifyProps) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ root?: string }>({});

  const handleChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    setOtp(numericValue);
    if (errors.root) {
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    if (!otp || otp.length !== 6) {
      setErrors({ root: "Please enter a valid 6-digit OTP" });
      return;
    }

    setIsLoading(true);
    try {
      const authService = getAuthService(role as UserRole);
      console.log("auth is: ", authService, role);
      const _response = await authService.verifyOtp({ email, otp });

      toast.success("OTP verified successfully!");

      const dashboardRoute =
        role === USER_ROLES.RECRUITER
          ? ROUTES.PROTECTED.RECRUITER_DASHBOARD
          : ROUTES.PROTECTED.USER_DASHBOARD;

      router.push(dashboardRoute);
    } catch (err) {
      console.error("OTP verification failed:", err);
      const error = err as IApiError;
      const errorMessage =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Invalid OTP. Please try again.";
      toast.error(errorMessage);
      setErrors({ root: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      const authService = getAuthService(role as UserRole);
      await authService.resendOtp({ email });
      toast.success("OTP resent successfully!");
    } catch (err) {
      console.error("Resend OTP failed:", err);
      const error = err as IApiError;
      const errorMessage =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Failed to resend OTP. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    otp,
    setOtp,
    handleChange,
    handleSubmit,
    handleResend,
    errors,
    isLoading,
  };
};
