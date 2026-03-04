"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ROUTES, USER_ROLES, UserRole } from "@/constants";
import { Card, CardContent } from "@/ui/card";
import { ForgotPasswordDialog } from "../components/forgot-password-dialog";
import { ForgotPasswordLink } from "../components/forgot-password-link";
import { FormInput } from "../components/form-input";
import { Icons } from "../components/icons";
import { LoginHeader } from "../components/login-header";
import AuthSeperater from "../components/seperater";
import { RedirectLink } from "../components/signup-link";
import { SocialLoginSection } from "../components/soical-login-section";
import SubmitButton from "../components/submit-button";
import { roleConfig } from "../config";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useLogin } from "../hooks/useLogin";
import { RoleConfig, UseLoginProps } from "../types";

const LoginPage: React.FC<UseLoginProps> = (props) => {
  const { role = USER_ROLES.USER } = props;
  const router = useRouter();
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const {
    form,
    handleChange,
    showPassword,
    togglePassword,
    handleSubmit,
    handleSocialLogin,
    // handleForgotPassword, // We will use local handler
    errors,
    isLoading,
  } = useLogin(props);

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordOpen(true);
  };

  const { handleGoogleLogin, isLoading: isGoogleLoading } = useGoogleAuth({
    role: role as UserRole,
    onSuccess: (data) => {
      console.log("Google login successful:", data);
      props.onSocialLogin?.({
        provider: "Google" as const,
        role,
        userInfo: data as Record<string, unknown>,
      });

      toast.success("Login successful!");

      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", ROUTES.PROTECTED.USER_DASHBOARD);
      }

      router.replace(ROUTES.PROTECTED.USER_DASHBOARD);
    },
    onError: (error) => {
      console.error("Google authentication failed:", error);
      toast.error("Google authentication failed");
    },
  });

  const config: RoleConfig = roleConfig[role] || roleConfig.user;

  return (
    <>
      <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm animate-in fade-in duration-700">
        <LoginHeader role={role} />

        <CardContent className="space-y-6">
          {config.showSocialSignup && (
            <SocialLoginSection
              onGoogleLogin={handleGoogleLogin}
              onGithubLogin={() => handleSocialLogin("GitHub")}
            />
          )}

          {role === USER_ROLES.USER && <AuthSeperater />}

          <div className="space-y-4">
            <div>
              <FormInput
                id="email"
                name="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                icon={<Icons.email className="w-5 h-5" />}
              />
              {errors.email && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <FormInput
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                showPasswordToggle={true}
                isPasswordVisible={showPassword}
                onTogglePassword={togglePassword}
                icon={<Icons.lock className="w-5 h-5" />}
              />
              {errors.password && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {config.showForgotPassword && (
              <ForgotPasswordLink onClick={handleForgotPasswordClick} />
            )}

            <SubmitButton
              onClick={handleSubmit}
              label={isLoading ? "Signing in..." : "Sign In"}
              disabled={isLoading}
              icon={!isLoading ? Icons.login : undefined}
              className="py-6 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-cyan-200/20"
            />
          </div>

          {role !== USER_ROLES.ADMIN && (
            <RedirectLink
              label="Don't have an account?"
              context="Sign Up"
              link={
                role === USER_ROLES.USER
                  ? "/users/auth/signup"
                  : "/recruiter/auth/signup"
              }
            />
          )}
        </CardContent>
      </Card>

      <ForgotPasswordDialog
        open={isForgotPasswordOpen}
        onOpenChange={setIsForgotPasswordOpen}
        role={role as UserRole}
        prefillEmail={form.email}
      />
    </>
  );
};

export default LoginPage;
