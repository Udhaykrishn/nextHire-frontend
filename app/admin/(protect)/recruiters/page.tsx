import type { Metadata } from "next";
import { Suspense } from "react";
import { RecruitersClient } from "./recruiters-client";

export const metadata: Metadata = {
  title: "Recruiter Management | Admin",
  description: "Manage recruiter accounts and business profiles.",
};

export default function RecruitersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecruitersClient />
    </Suspense>
  );
}
