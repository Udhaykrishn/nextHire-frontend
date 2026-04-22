import type { Metadata } from "next";
import { Suspense } from "react";
import { UsersClient } from "./users-client";

export const metadata: Metadata = {
  title: "User Management | Admin",
  description: "Manage users and candidate profiles.",
};

export default function UsersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UsersClient />
    </Suspense>
  );
}
