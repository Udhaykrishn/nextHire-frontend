import { Metadata } from "next";
import { AuthLayout } from "@/modules/auth/components/auth-layout";
import SignupPage from "@/modules/auth/pages/signup";

export const metadata: Metadata = {
  title: "Create Account | NextHire",
  description:
    "Join NextHire today to connect with top employers and advance your career.",
};

const page = () => {
  return (
    <AuthLayout
      imageProps={{
        src: "/auth/signup-visual.png",
        title: "Join the Elite",
        description:
          "Begin your journey today and connect with premium opportunities tailored to your expertise.",
      }}
    >
      <SignupPage userRole="user" />
    </AuthLayout>
  );
};

export default page;
