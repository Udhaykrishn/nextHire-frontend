import { Suspense } from "react";
import ResetPasswordClient from "@/modules/auth/pages/reset-password";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafbfc] dark:bg-zinc-950 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-200 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full flex justify-center">
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-4 animate-pulse">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-zinc-800 rounded-2xl" />
              <div className="h-4 w-32 bg-slate-100 dark:bg-zinc-800 rounded" />
            </div>
          }
        >
          <ResetPasswordClient />
        </Suspense>
      </div>
    </div>
  );
}
