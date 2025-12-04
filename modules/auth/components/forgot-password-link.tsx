import { Button } from "@/components/animate-ui/components/buttons/button";
import { Icons } from "./icons";

interface ForgotPasswordLinkProps {
  onClick: () => void;
}

export const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({ onClick }) => {
  return (
    <div className="flex justify-end">
      <Button
        type="button"
        variant="link"
        onClick={onClick}
        className="text-sm text-cyan-400 hover:text-cyan-500 font-medium p-0 h-auto"
      >
        <Icons.help className="w-4 h-4 mr-1" />
        Forgot password?
      </Button>
    </div>
  );
};