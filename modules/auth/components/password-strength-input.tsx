"use client";

import { Check, X } from "lucide-react";
import { useMemo } from "react";
import { FormInput } from "./form-input";
import { Icons } from "./icons";

const PASSWORD_REQUIREMENTS = [
  { regex: /.{6,}/, text: "At least 6 characters" },
  { regex: /[0-9]/, text: "At least 1 number" },
  { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "At least 1 special character" },
] as const;

type StrengthScore = 0 | 1 | 2 | 3 | 4 | 5;

const STRENGTH_CONFIG = {
  texts: {
    0: "Enter a password",
    1: "Weak password",
    2: "Medium password",
    3: "Strong password",
    4: "Very strong password",
  } satisfies Record<Exclude<StrengthScore, 5>, string>,
} as const;

type Requirement = {
  met: boolean;
  text: string;
};

type PasswordStrength = {
  score: StrengthScore;
  requirements: Requirement[];
};

interface PasswordStrengthInputProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onTogglePassword?: () => void;
  error?: string;
  className?: string;
}

export const PasswordStrengthInput: React.FC<PasswordStrengthInputProps> = ({
  id,
  name,
  label,
  placeholder = "Create a strong password",
  value,
  onChange,
  showPasswordToggle = true,
  isPasswordVisible = false,
  onTogglePassword,
  error,
  className,
}) => {
  const calculateStrength = useMemo((): PasswordStrength => {
    const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
      met: req.regex.test(value),
      text: req.text,
    }));

    return {
      score: requirements.filter((req) => req.met).length as StrengthScore,
      requirements,
    };
  }, [value]);

  const getStrengthColor = (index: number) => {
    if (calculateStrength.score === 0) return "bg-border dark:bg-zinc-800";
    if (calculateStrength.score >= index + 1) {
      if (calculateStrength.score === 1) return "bg-red-500";
      if (calculateStrength.score === 2) return "bg-orange-500";
      if (calculateStrength.score === 3) return "bg-amber-500";
      if (calculateStrength.score === 4) return "bg-yellow-500";
      if (calculateStrength.score === 5) return "bg-emerald-500";
    }
    return "bg-border dark:bg-zinc-800";
  };

  const getStrengthText = () => {
    if (calculateStrength.score === 5) return "Excellent password!";
    return STRENGTH_CONFIG.texts[
      Math.min(calculateStrength.score, 4) as keyof typeof STRENGTH_CONFIG.texts
    ];
  };

  const getStrengthTextColor = () => {
    if (calculateStrength.score === 0) return "text-muted-foreground";
    if (calculateStrength.score === 1) return "text-red-500";
    if (calculateStrength.score === 2) return "text-orange-500";
    if (calculateStrength.score === 3) return "text-amber-500";
    if (calculateStrength.score === 4) return "text-yellow-600";
    return "text-emerald-600";
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <FormInput
        id={id}
        name={name}
        label={label}
        type="password"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        showPasswordToggle={showPasswordToggle}
        isPasswordVisible={isPasswordVisible}
        onTogglePassword={onTogglePassword}
        icon={<Icons.lock className="w-5 h-5" />}
        error={error}
      />

      {value && (
        <div className="space-y-3 px-1 animate-in fade-in slide-in-from-top-1 duration-300">
          {/* Strength Bars */}
          <div className="flex gap-1.5 w-full">
            {[0, 1, 2, 3, 4].map((barIndex) => (
              <div
                key={barIndex}
                className={`h-1.5 rounded-full w-full transition-all duration-500 ${getStrengthColor(
                  barIndex,
                )}`}
              />
            ))}
          </div>

          {/* Strength Text */}
          <div className="flex justify-between items-center text-[10px] sm:text-xs">
            <span className="text-muted-foreground font-black uppercase tracking-wider">
              Security Level:
            </span>
            <span
              className={`font-black uppercase tracking-widest ${getStrengthTextColor()}`}
            >
              {getStrengthText()}
            </span>
          </div>

          {/* Requirements List */}
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            aria-label="Password requirements"
          >
            {calculateStrength.requirements.map((req) => (
              <li
                key={req.text}
                className="flex items-center gap-2 bg-muted/30 p-2 rounded-lg border border-border/40"
              >
                {req.met ? (
                  <Check size={12} className="text-emerald-500 flex-shrink-0" />
                ) : (
                  <X
                    size={12}
                    className="text-muted-foreground/40 flex-shrink-0"
                  />
                )}
                <span
                  className={`text-[10px] transition-colors leading-none ${
                    req.met
                      ? "text-emerald-600 dark:text-emerald-500 font-bold"
                      : "text-muted-foreground font-medium"
                  }`}
                >
                  {req.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
