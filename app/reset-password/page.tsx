"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { USER_ROLES, UserRole } from "@/constants";
import { FormInput } from "@/modules/auth/components/form-input";
import { Icons } from "@/modules/auth/components/icons";
import SubmitButton from "@/modules/auth/components/submit-button";
import { useResetPassword } from "@/modules/auth/hooks/useResetPassword";
import { Card, CardContent } from "@/ui/card";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const type = searchParams?.get("type");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { resetPassword, isLoading } = useResetPassword();

  const handleSubmit = async () => {
    if (!token || !type) return;

    // Map type to UserRole. The backend sends 'user' or 'recruiter'.
    const role: UserRole =
      type === "recruiter" ? USER_ROLES.RECRUITER : USER_ROLES.USER;

    await resetPassword(role, {
      token,
      password,
      confirmPassword,
    });
  };

  if (!token) {
    return (
      <div className="text-center text-red-500">Invalid or missing token.</div>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm">
      <CardContent className="space-y-6 pt-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground text-sm">
            Enter your new password below.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <FormInput
              id="password"
              name="password"
              label="New Password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPasswordToggle={true}
              isPasswordVisible={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              icon={<Icons.lock className="w-5 h-5" />}
            />
          </div>

          <div>
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              showPasswordToggle={true}
              isPasswordVisible={showConfirmPassword}
              onTogglePassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              icon={<Icons.lock className="w-5 h-5" />}
            />
          </div>

          <SubmitButton
            onClick={handleSubmit}
            label={isLoading ? "Reseting..." : "Reset Password"}
            disabled={isLoading || !password || !confirmPassword}
            icon={!isLoading ? Icons.lock : undefined}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50/30 via-cyan-100/20 to-blue-50/30 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
