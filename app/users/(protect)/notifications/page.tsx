import type { Metadata } from "next";
import { Suspense } from "react";
import { NotificationsClient } from "@/modules/users/components";

export const metadata: Metadata = {
  title: "Notifications | NextHire",
  description:
    "Stay updated with the latest job alerts and messages on NextHire.",
};

export default function NotificationsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4 animate-pulse">
          <div className="h-20 bg-muted rounded-xl w-64" />
          {[1, 2, 3, 4].map((item) => (
            <div
              key={`notif-skeleton-${item}`}
              className="h-24 bg-muted rounded-xl w-full"
            />
          ))}
        </div>
      }
    >
      <NotificationsClient />
    </Suspense>
  );
}
