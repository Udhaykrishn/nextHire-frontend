"use client";

import { SlidingNumber } from "@/components/animate-ui/primitives/texts/sliding-number";
import { AnimatedThemeToggle } from "@/components/animated-theme-toggle";
import { AppLayout } from "@/components/app-layout";

export default function Home() {
  return (
    <AppLayout>
      <div className="flex min-h-screen items-center justify-center gap-4 bg-zinc-50 font-sans dark:bg-zinc-900">
        <SlidingNumber number={123} animate={true} />

        <AnimatedThemeToggle direction="ltr" />
      </div>
    </AppLayout>
  );
}
