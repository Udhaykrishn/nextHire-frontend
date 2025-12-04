import { CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { LoginLogo } from "./login-logo";

interface SignupHeaderProps {
    role: string;
}

export const SignupHeader: React.FC<SignupHeaderProps> = ({ role }) => {
    return (
        <CardHeader className="space-y-4 text-center pb-8">
            <LoginLogo />
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</CardTitle>
            <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                Join us and create your {role} account
            </CardDescription>
        </CardHeader>
    );
};
