import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { USER_ROLES } from "@/constants";
import OtpVerifyPage from "@/modules/auth/pages/otp-verify";

export const metadata: Metadata = {
  title: "Verify OTP | NextHire",
  description:
    "Verify your email address to complete the registration process.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  if (!email) {
    redirect("/users/auth/signup");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpVerifyPage role={USER_ROLES.USER} />
    </Suspense>
  );
}
