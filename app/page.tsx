"use client";

import { SlidingNumber } from "@/components/animate-ui/primitives/texts/sliding-number";
import { AnimatedThemeToggle } from "@/components/animated-theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-4 bg-zinc-50 font-sans dark:bg-zinc-900">
      <SlidingNumber number={123} animate={true} />

      <AnimatedThemeToggle direction="ltr" />
    </div>
  );
}
