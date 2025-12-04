import { CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { LoginLogo } from "./login-logo";

interface LoginHeaderProps {
  role: string;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({ role }) => {
  return (
    <CardHeader className="space-y-4 text-center pb-8">
      <LoginLogo />
      <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</CardTitle>
      <CardDescription className="text-base text-gray-600 dark:text-gray-400">
        Sign in to your {role} account to continue
      </CardDescription>
    </CardHeader>
  );
};