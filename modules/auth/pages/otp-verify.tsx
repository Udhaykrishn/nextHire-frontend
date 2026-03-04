"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS_STR,
} from "@/ui/input-otp";
import { Icons } from "../components/icons";
import SubmitButton from "../components/submit-button";
import { useOtpVerify } from "../hooks/useOtpVerify";

interface OtpVerifyPageProps {
  role?: string;
}

const OtpVerifyPage: React.FC<OtpVerifyPageProps> = ({ role: propRole }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") ?? "";
  const role = propRole ?? (searchParams?.get("role") as any) ?? "user";

  const { otp, handleChange, errors, isLoading, handleSubmit, handleResend } =
    useOtpVerify({ email, role });

  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!email) {
      router.replace("/users/auth/signup");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const onResend = async () => {
    await handleResend();
    setResendTimer(60);
    setCanResend(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50/30 via-cyan-100/20 to-blue-50/30 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm">
        <CardContent className="space-y-6 p-8">
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Icons.email className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">Verify Your Email</h2>
            <p className="text-muted-foreground">
              We sent a 6-digit code to <br />
              <span className="font-medium text-foreground">{email}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={handleChange}
                pattern={REGEXP_ONLY_DIGITS_STR}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {errors.root && (
              <p className="text-red-600 dark:text-red-400 text-sm text-center">
                {errors.root}
              </p>
            )}
          </div>

          <SubmitButton
            onClick={handleSubmit}
            label="Verify OTP"
            icon={Icons.lock}
          />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              {canResend ? (
                <button
                  onClick={onResend}
                  disabled={isLoading}
                  className="text-primary font-medium hover:underline disabled:opacity-50"
                >
                  Resend OTP
                </button>
              ) : (
                <span className="text-foreground font-medium">
                  Resend in {resendTimer}s
                </span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OtpVerifyPage;
