import { Button } from "@/components/animate-ui/components/buttons/button";

interface SocialButtonProps {
  provider: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  icon,
  onClick,
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-cyan-400 transition-all py-5 text-base"
      onClick={onClick}
    >
      {icon}
      <span>Continue with {provider}</span>
    </Button>
  );
};
