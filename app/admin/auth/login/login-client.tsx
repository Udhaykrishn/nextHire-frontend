"use client";

import { Suspense } from "react";
import LoginPage from "@/modules/auth/pages/login";

export function LoginContent() {
  return (
    <LoginPage
      role={"admin"}
      onLogin={() => {}}
      onSocialLogin={(provider) => console.log("Social login:", provider)}
    />
  );
}

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
};

export default page;
