import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { USER_ROLES } from "@/constants";
import OtpVerifyPage from "@/modules/auth/pages/otp-verify";

export const metadata: Metadata = {
  title: "Verify Account | Recruiter",
  description: "Verify your recruiter account to start posting jobs.",
};

export default async function RecruiterOtpVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  if (!email) {
    redirect("/recruiter/auth/signup");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpVerifyPage role={USER_ROLES.RECRUITER} />
    </Suspense>
  );
}
