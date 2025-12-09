"use client"

import { useState } from "react";
import { signupSchema } from "../validation/signup-schema.validation";
import { getAuthService } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import { USER_ROLES, UserRole } from "@/constants";
import { toast } from "sonner";

export interface SignupPayload {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    company_name?: string;
    role?: string;
}

export interface UseSignupProps {
    role?: string;
    onSignup?: (payload: SignupPayload) => void;
    onSocialSignup?: (payload: { provider: string; role: string }) => void;
}

export const useSignup = ({
    role = "user",
    onSignup,
    onSocialSignup,
}: UseSignupProps) => {
    const router = useRouter();

    console.log("signup role is: ",role)

    const [form, setForm] = useState<{
        name: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
        company_name?: string;
    }>({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        phone?: string;
        company_name?: string;
        password?: string;
        confirmPassword?: string;
        root?: string;
    }>({});

    const handleSubmit = async () => {
        const result = signupSchema.safeParse({ ...form, role });
        if (!result.success) {
            const formattedErrors = result.error.format();
            setErrors({
                name: formattedErrors.name?._errors?.[0],
                email: formattedErrors.email?._errors?.[0],
                phone: formattedErrors.phone?._errors?.[0],
                password: formattedErrors.password?._errors?.[0],
                confirmPassword: formattedErrors.confirmPassword?._errors?.[0],
            });
            return;
        }
        setErrors({});
        setIsLoading(true);
        try {
            const payload: SignupPayload = result.data;
            const { role: _, confirmPassword, ...userData } = payload;
            const authService = getAuthService(role as UserRole);
            await authService.signup(userData);
            onSignup?.(payload);
            toast.success("Signup successful! Please verify your email.");

            const otpRoute = role === USER_ROLES.RECRUITER
                ? `/recruiter/auth/otp-verify?email=${encodeURIComponent(payload.email)}`
                : `/users/auth/otp-verify?email=${encodeURIComponent(payload.email)}`;
            router.replace(otpRoute);
        } catch (error: any) {
            console.error("Signup failed:", error);
            const errorMessage = error.response?.data?.error?.message || "Signup failed. Please try again.";
            toast.error(errorMessage);
            setErrors({
                root: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialSignup = (provider: string) => {
        const payload = { provider, role };
        onSocialSignup?.(payload);
        console.log("Social signup:", payload);
    };

    const togglePassword = () => setShowPassword((prev) => !prev);
    const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

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
        showConfirmPassword,
        togglePassword,
        toggleConfirmPassword,
        handleSubmit,
        handleSocialSignup,
        errors,
        isLoading,
    };
};
