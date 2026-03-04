import { AuthLayout } from "@/modules/auth/components/auth-layout";
import RecruiterLoginPage from "./login-client";

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
