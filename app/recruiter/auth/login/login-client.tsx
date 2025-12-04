"use client"

import LoginPage from "@/modules/auth/pages/login";
import { USER_ROLES } from "@/constants";

export default function RecruiterLoginPage() {
    return <LoginPage role={USER_ROLES.RECRUITER} />;
}
