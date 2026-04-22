"use client";

import { ChangeEvent, ReactNode } from "react";
import { Button } from "@/components/animate-ui/primitives/buttons/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Icons } from "./icons";

interface FormInputProps {
  id: string;
  name?: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: ReactNode;
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onTogglePassword?: () => void;
  error?: string;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = true,
  icon,
  showPasswordToggle = false,
  isPasswordVisible = false,
  onTogglePassword,
  error,
  className,
}) => {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </Label>

      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}

        {/* Input */}
        <Input
          id={id}
          name={name || id}
          type={
            showPasswordToggle
              ? isPasswordVisible
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-400 focus:border-red-500"
              : "focus:ring-cyan-400 focus:border-cyan-400"
          } ${icon ? "pl-10" : ""} ${showPasswordToggle ? "pr-10" : ""} ${className}`}
        />

        {showPasswordToggle && onTogglePassword && (
          <Button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          >
            <span className="text-gray-400 hover:text-cyan-400 transition-colors">
              {isPasswordVisible ? (
                <Icons.eyeOff className="w-5 h-5" />
              ) : (
                <Icons.eye className="w-5 h-5" />
              )}
            </span>
          </Button>
        )}
      </div>
      {error && (
        <p className="text-xs font-semibold text-red-500 mt-1 pl-1">{error}</p>
      )}
    </div>
  );
};
