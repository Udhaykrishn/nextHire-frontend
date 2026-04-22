import { Metadata } from "next";
import { USER_ROLES } from "@/constants";
import { AuthLayout } from "@/modules/auth/components/auth-layout";
import SignupPage from "@/modules/auth/pages/signup";

export const metadata: Metadata = {
  title: "Recruiter Signup | NextHire",
  description:
    "Start hiring on NextHire. Create a recruiter account to find and hire top talent.",
};

export default function RecruiterSignupPage() {
  return (
    <AuthLayout
      imageProps={{
        src: "/auth/signup-visual.png",
        title: "Build Your Dream Team",
        description:
          "Post jobs, track applications, and hire the best talent with our streamlined recruitment dashboard.",
      }}
    >
      <SignupPage userRole={USER_ROLES.RECRUITER} />
    </AuthLayout>
  );
}
