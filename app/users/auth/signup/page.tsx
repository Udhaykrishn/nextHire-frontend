import { AuthLayout } from "@/modules/auth/components/auth-layout";
import SignupPage from "@/modules/auth/pages/signup";

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
