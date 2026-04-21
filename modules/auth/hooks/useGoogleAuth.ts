"use client";

import { CredentialResponse } from "@react-oauth/google";
import { useState } from "react";
import { toast } from "sonner";
import { API_ROUTES, USER_ROLES, UserRole } from "@/constants";
import { userApi as axiosInstance } from "@/lib/user.api";
import { IApiError } from "@/types/api-error";

interface UseGoogleAuthProps {
  role?: UserRole;
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
}

export function useGoogleAuth({
  role = USER_ROLES.USER,
  onSuccess,
  onError,
}: UseGoogleAuthProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!credentialResponse.credential) {
        throw new Error("No credential received from Google");
      }

      const apiRoute =
        role === USER_ROLES.RECRUITER
          ? API_ROUTES.AUTH.RECRUITER.GOOGLE
          : API_ROUTES.AUTH.USER.GOOGLE;

      const response = await axiosInstance.post(apiRoute, {
        credential: credentialResponse.credential,
      });

      onSuccess?.(response.data);

      return response.data;
    } catch (err) {
      const error = err as IApiError;
      const errorMessage =
        error.response?.data?.error?.message || "Google authentication failed";
      console.error("Failed to authenticate with Google:", err);
      toast.error(errorMessage);
      onError?.(err);

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleGoogleLogin,
    isLoading,
    error,
  };
}
