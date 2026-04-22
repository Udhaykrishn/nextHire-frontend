"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ROUTES, USER_ROLES, UserRole } from "@/constants";
import { IApiError } from "@/types/api-error";
import { Card, CardContent } from "@/ui/card";
import { FormInput } from "../components/form-input";
import { Icons } from "../components/icons";
import { PasswordStrengthInput } from "../components/password-strength-input";
import AuthSeperater from "../components/seperater";
import { SignupHeader } from "../components/signup-header";
import { RedirectLink } from "../components/signup-link";
import { SocialLoginSection } from "../components/soical-login-section";
import SubmitButton from "../components/submit-button";
import { roleConfig } from "../config";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { UseSignupProps, useSignup } from "../hooks/useSignup";
import { RoleConfig } from "../types";

const SignupPage: React.FC<UseSignupProps> = (props) => {
  const { userRole = USER_ROLES.USER } = props;
  const role = userRole;
  const router = useRouter();

  const {
    form,
    handleChange,
    showPassword,
    showConfirmPassword,
    togglePassword,
    toggleConfirmPassword,
    handleSubmit,
    handleSocialSignup,
    errors,
  } = useSignup({ ...props, userRole: role });

  const { handleGoogleLogin } = useGoogleAuth({
    role: role as UserRole,
    onSuccess: (_data) => {
      toast.success("Signup successful!");
      router.replace(ROUTES.PROTECTED.USER_DASHBOARD);
    },
    onError: (err) => {
      const error = err as IApiError;
      toast.error(
        error.response?.data?.error?.message ?? "Google signup failed",
      );
    },
  });

  const config: RoleConfig = roleConfig[role] || roleConfig.user;

  return (
    <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm animate-in fade-in duration-700">
      <SignupHeader role={role} />

      <CardContent className="space-y-6">
        <div className="space-y-4">
          {config.showSocialSignup && (
            <SocialLoginSection
              onGoogleLogin={handleGoogleLogin}
              onGithubLogin={() => handleSocialSignup("GitHub")}
            />
          )}

          {role === USER_ROLES.USER && (
            <>
              {" "}
              <AuthSeperater />
              <div>
                <FormInput
                  id="name"
                  name="name"
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  icon={<Icons.userPlus className="w-5 h-5" />}
                />
                {errors.name && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Name field for recruiters */}
          {role === USER_ROLES.RECRUITER && (
            <div>
              <FormInput
                id="name"
                name="name"
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                icon={<Icons.userPlus className="w-5 h-5" />}
              />
              {errors.name && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>
          )}

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
              id="phone"
              name="phone"
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={form.phone}
              onChange={handleChange}
              icon={<Icons.phone className="w-5 h-5" />}
            />
            {errors.phone && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <PasswordStrengthInput
            id="password"
            name="password"
            label="Password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={handleChange}
            showPasswordToggle={true}
            isPasswordVisible={showPassword}
            onTogglePassword={togglePassword}
            error={errors.password}
          />

          <div>
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              showPasswordToggle={true}
              isPasswordVisible={showConfirmPassword}
              onTogglePassword={toggleConfirmPassword}
              icon={<Icons.lock className="w-5 h-5" />}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <SubmitButton
            onClick={handleSubmit}
            label="Sign Up"
            icon={Icons.userPlus}
            className="py-6 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-cyan-200/20"
          />
        </div>

        {role !== USER_ROLES.ADMIN && (
          <RedirectLink
            link={
              role === USER_ROLES.USER
                ? "/users/auth/login"
                : "/recruiter/auth/login"
            }
            label="Already have an account?"
            context="Sign In"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SignupPage;
