"use client"

import SignupPage from "@/modules/auth/pages/signup";
import { USER_ROLES } from "@/constants";

export default function RecruiterSignupPage() {
    return <SignupPage role={USER_ROLES.RECRUITER} />;
}
