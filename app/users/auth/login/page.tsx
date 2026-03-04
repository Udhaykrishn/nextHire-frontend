import { AuthLayout } from "@/modules/auth/components/auth-layout";
import { LoginClient } from "@/pages/auth/login";

const page = () => {
  return (
    <AuthLayout
      imageProps={{
        src: "/auth/login-visual.png",
        title: "Access the Future",
        description:
          "Join the most advanced ecosystem for professional growth and talent discovery.",
      }}
    >
      <LoginClient />
    </AuthLayout>
  );
};

export default page;
