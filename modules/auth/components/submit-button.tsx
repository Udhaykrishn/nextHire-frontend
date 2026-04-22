import { JSX } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { IconProps } from "./icons";

interface SubmitButtonProps {
  onClick?: () => void;
  label: string;
  icon?: (props: IconProps) => JSX.Element;
  disabled?: boolean;
  className?: string;
}

const SubmitButton = ({
  onClick,
  label,
  icon: Icon,
  disabled,
  className,
}: SubmitButtonProps) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-cyan-400! hover:!bg-cyan-500 !text-white font-semibold py-5 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl border-0 flex items-center justify-center gap-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      style={{ backgroundColor: "#22D3EE", color: "#ffffff" }}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {label}
    </Button>
  );
};

export default SubmitButton;
