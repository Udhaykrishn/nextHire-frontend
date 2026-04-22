import { Metadata } from "next";
import { AuthLayout } from "@/modules/auth/components/auth-layout";
import RecruiterLoginPage from "./login-client";

export const metadata: Metadata = {
  title: "Recruiter Login | NextHire",
  description:
    "Login to NextHire as a recruiter to find and manage top talent.",
};

const page = () => {
  return (
    <AuthLayout
      imageProps={{
        src: "/auth/login-visual.png",
        title: "Find Top Talent",
        description:
          "Scale your engineering team with the most qualified candidates in the tech industry.",
      }}
    >
      <RecruiterLoginPage />
    </AuthLayout>
  );
};

export default page;
