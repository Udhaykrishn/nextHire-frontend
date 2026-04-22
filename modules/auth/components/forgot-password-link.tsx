import { Button } from "@/components/animate-ui/components/buttons/button";

interface ForgotPasswordLinkProps {
  onClick: () => void;
}

export const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({
  onClick,
}) => {
  return (
    <div className="flex justify-end pt-1">
      <Button
        type="button"
        variant="link"
        onClick={onClick}
        className="text-[10px] text-cyan-500 hover:text-cyan-600 font-black uppercase tracking-widest p-0 h-auto italic"
      >
        Retrieve Secret Key
      </Button>
    </div>
  );
};
