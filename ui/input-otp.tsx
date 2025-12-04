"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// Pattern string for numeric input only (0-9)
export const REGEXP_ONLY_DIGITS_STR = "[0-9]";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-3 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        // Base styles - larger size
        "relative flex h-14 w-14 items-center justify-center text-xl font-semibold transition-all outline-none",
        // Border and background
        "border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50",
        // Rounded corners
        "rounded-lg",
        // Active state - cyan/aqua blue
        "data-[active=true]:border-cyan-500 data-[active=true]:ring-4 data-[active=true]:ring-cyan-500/20",
        "dark:data-[active=true]:border-cyan-400 dark:data-[active=true]:ring-cyan-400/20",
        // Hover state
        "hover:border-cyan-400 dark:hover:border-cyan-500",
        // Focus/filled state
        "has-[char]:border-cyan-500 dark:has-[char]:border-cyan-400",
        // Shadow
        "shadow-sm hover:shadow-md",
        // Error state
        "aria-invalid:border-red-500 dark:aria-invalid:border-red-400",
        "data-[active=true]:aria-invalid:ring-red-500/20 dark:data-[active=true]:aria-invalid:ring-red-400/20",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-cyan-500 dark:bg-cyan-400 h-6 w-0.5 duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
