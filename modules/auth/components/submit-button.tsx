import { Button } from "@/components/animate-ui/components/buttons/button"
import { IconProps } from "./icons";
import { JSX } from "react";

interface SubmitButtonProps {
    onClick: () => void;
    label: string;
    icon?: (props: IconProps) => JSX.Element;
}

const SubmitButton = ({ onClick, label, icon: Icon }: SubmitButtonProps) => {
    return (
        <Button
            type="button"
            onClick={onClick}
            className="w-full bg-cyan-400! hover:!bg-cyan-500 !text-white font-semibold py-5 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl border-0 flex items-center justify-center gap-2"
            style={{ backgroundColor: '#22D3EE', color: '#ffffff' }}
        >
            {Icon && <Icon className="w-5 h-5" />}
            {label}
        </Button>
    )
}

export default SubmitButton