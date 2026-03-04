import { Suspense } from "react";
import { NotificationsClient } from "@/modules/users/components/notifications-client";

export default function NotificationsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4 animate-pulse">
          <div className="h-20 bg-muted rounded-xl w-64" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-muted rounded-xl w-full" />
          ))}
        </div>
      }
    >
      <NotificationsClient />
    </Suspense>
  );
}
