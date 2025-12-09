"use client"

import { toast } from "sonner";

import { RedirectLink } from "../components/signup-link";
import { Icons } from "../components/icons";
import { ForgotPasswordLink } from "../components/forgot-password-link";
import { Card, CardContent } from "@/ui/card";
import { LoginHeader } from "../components/login-header";
import { useLogin } from "../hooks/useLogin";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { RoleConfig, UseLoginProps } from "../types";
import { roleConfig } from "../config";
import { FormInput } from "../components/form-input";
import { SocialLoginSection } from "../components/soical-login-section";
import SubmitButton from "../components/submit-button";
import AuthSeperater from "../components/seperater";
import { ROUTES, USER_ROLES, UserRole } from "@/constants";
import { useRouter } from "next/navigation";


const LoginPage: React.FC<UseLoginProps> = (props) => {
  const { role = USER_ROLES.USER } = props;
  const router = useRouter();

  const {
    form,
    handleChange,
    showPassword,
    togglePassword,
    handleSubmit,
    handleSocialLogin,
    handleForgotPassword,
    errors,
  } = useLogin(props);

  const { handleGoogleLogin, isLoading: isGoogleLoading } = useGoogleAuth({
    role: role as UserRole,
    onSuccess: (data) => {
      console.log('Google login successful:', data);
      props.onSocialLogin?.({ provider: 'Google', role, userInfo: data });

      toast.success("Login successful!");

      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', ROUTES.PROTECTED.USER_DASHBOARD);
      }

      router.replace(ROUTES.PROTECTED.USER_DASHBOARD);
    },
    onError: (error) => {
      console.error('Google authentication failed:', error);
      toast.error("Google authentication failed");
    },
  });

  const config: RoleConfig = roleConfig[role] || roleConfig.user;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50/30 via-cyan-100/20 to-blue-50/30 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm">
        <LoginHeader role={role} />

        <CardContent className="space-y-6">
          {config.showSocialSignup && (
            <SocialLoginSection
              onGoogleLogin={handleGoogleLogin}
              onGithubLogin={() => handleSocialLogin('GitHub')}
            />
          )}

          {
            role === USER_ROLES.USER && (
              <AuthSeperater />
            )
          }

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
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.email}</p>
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
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {config.showForgotPassword && (
              <ForgotPasswordLink onClick={handleForgotPassword} />
            )}

            <SubmitButton onClick={handleSubmit} label="Sign In" icon={Icons.login} />
          </div>



          {role !== USER_ROLES.ADMIN && (
            <RedirectLink
              label="Don't have an account?"
              context="Sign Up"
              link={role === USER_ROLES.USER ? "/users/auth/signup" : "/recruiter/auth/signup"}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;