import type { Metadata } from "next";
import { LoginContent } from "./login-client";

export const metadata: Metadata = {
  title: "Admin Login | NextHire",
  description: "Secure login for NextHire administrators.",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <LoginContent />
      </div>
    </div>
  );
}
