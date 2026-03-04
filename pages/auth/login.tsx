"use client";

import { Suspense } from "react";
import LoginPage from "@/modules/auth/pages/login";

const LoginContent = () => {
  return (
    <LoginPage
      onLogin={() => {}}
      onForgotPassword={() => console.log("Forgot password")}
      onSocialLogin={(provider) => console.log("Social login:", provider)}
    />
  );
};

export const LoginClient = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginClient;
