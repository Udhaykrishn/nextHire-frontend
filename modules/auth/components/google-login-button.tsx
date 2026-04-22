"use client";

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRef } from "react";
import { Icons } from "./icons";
import { SocialButton } from "./soical-button";

interface GoogleLoginButtonProps {
  onSuccess: (credentialResponse: CredentialResponse) => void;
  onError?: () => void;
}

export function GoogleLoginButton({
  onSuccess,
  onError,
}: GoogleLoginButtonProps) {
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const handleCustomButtonClick = () => {
    const googleBtn = googleButtonRef.current?.querySelector(
      'div[role="button"]',
    ) as HTMLElement;
    if (googleBtn) {
      googleBtn.click();
    }
  };

  return (
    <>
      <div ref={googleButtonRef} style={{ display: "none" }}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => {
            console.error("Google login failed");
            onError?.();
          }}
        />
      </div>

      <SocialButton
        provider="Google"
        icon={<Icons.google className="h-5 w-5" />}
        onClick={handleCustomButtonClick}
      />
    </>
  );
}
