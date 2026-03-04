"use client";

import { USER_ROLES } from "@/constants";
import LoginPage from "@/modules/auth/pages/login";

export default function RecruiterLoginPage() {
  return <LoginPage role={USER_ROLES.RECRUITER} />;
}
