"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAuthService } from "@/services/auth-service";
import { ROUTES, USER_ROLES, UserRole } from "@/constants";
import { redirect } from "../utils/redirect";

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
        const numericValue = value.replace(/\D/g, '');
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
            const response = await authService.verifyOtp({ email, otp });

            toast.success("OTP verified successfully!");

            const dashboardRoute = role === USER_ROLES.RECRUITER
                ? ROUTES.PROTECTED.RECRUITER_DASHBOARD
                : ROUTES.PROTECTED.USER_DASHBOARD;

            redirect(dashboardRoute);
        } catch (error: any) {
            console.error("OTP verification failed:", error);
            const errorMessage = error.response?.data?.message || "Invalid OTP. Please try again.";
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
        } catch (error: any) {
            console.error("Resend OTP failed:", error);
            toast.error("Failed to resend OTP. Please try again.");
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
