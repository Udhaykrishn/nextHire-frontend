import { CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { LoginLogo } from "./login-logo";

interface SignupHeaderProps {
  role: string;
}

export const SignupHeader: React.FC<SignupHeaderProps> = ({ role }) => {
  return (
    <CardHeader className="space-y-2 text-center pb-8 pt-8">
      <div className="flex justify-center mb-4 scale-110">
        <LoginLogo />
      </div>
      <CardTitle className="text-3xl font-black text-slate-800 dark:text-zinc-100 italic uppercase tracking-tight">
        Join NextHire
      </CardTitle>
      <CardDescription className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-60">
        Initialize {role} Profile • Secure Setup
      </CardDescription>
    </CardHeader>
  );
};
