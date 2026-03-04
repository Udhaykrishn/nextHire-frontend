"use client";

import { CredentialResponse } from "@react-oauth/google";
import { GoogleLoginButton } from "./google-login-button";
import { Icons } from "./icons";
import { SocialButton } from "./soical-button";

interface SocialLoginSectionProps {
  onGoogleLogin: (credentialResponse: CredentialResponse) => void;
  onGithubLogin: () => void;
}

export const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({
  onGoogleLogin,
  onGithubLogin,
}) => {
  return (
    <div className="space-y-3">
      <GoogleLoginButton
        onSuccess={onGoogleLogin}
        onError={() => console.error("Google login failed")}
      />
      <SocialButton
        provider="GitHub"
        icon={<Icons.github className="w-5 h-5" />}
        onClick={onGithubLogin}
      />
    </div>
  );
};
