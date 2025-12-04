"use client"

import { Button } from "@/components/animate-ui/primitives/buttons/button"
import { ChangeEvent, ReactNode } from "react"
import { Icons } from "./icons"
import { Label } from "@/ui/label"
import { Input } from "@/ui/input"

interface FormInputProps {
  id: string
  name?: string
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  icon?: ReactNode
  showPasswordToggle?: boolean
  isPasswordVisible?: boolean
  onTogglePassword?: () => void
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
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
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
          className={`w-full focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 ${icon ? "pl-10" : ""
            } ${showPasswordToggle ? "pr-10" : ""}`}
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
    </div>
  )
}
