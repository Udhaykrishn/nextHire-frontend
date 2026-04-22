"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";

interface SlidingNumberProps {
  number: number;
  animate?: boolean;
  className?: string;
}

function Digit({ value }: { value: string }) {
  const numericValue = parseInt(value, 10);

  if (isNaN(numericValue)) {
    return <span>{value}</span>;
  }

  return (
    <div
      className="relative inline-block h-[1em] overflow-hidden"
      style={{
        width: "1ch",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <m.div
        initial={false}
        animate={{ y: `-${numericValue * 10}%` }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="absolute inset-0 flex flex-col"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={`digit-${i}`}
            className="flex h-[1em] items-center justify-center leading-none"
          >
            {i}
          </span>
        ))}
      </m.div>
    </div>
  );
}

export function SlidingNumber({
  number,
  animate = true,
  className,
}: SlidingNumberProps) {
  if (!animate) {
    return <span className={className}>{number}</span>;
  }

  const digits = number.toString().split("");

  return (
    <div
      className={cn("inline-flex items-end font-mono leading-none", className)}
    >
      {digits.map((digit, index) => (
        <Digit key={`pos-${index}-${digit}`} value={digit} />
      ))}
    </div>
  );
}
