"use client";

import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, Bell, CheckCircle2, Clock } from "lucide-react";
import { useNotifications } from "@/modules/users/hooks/use-notifications";

const ICON_MAP = {
  info: Bell,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: Clock,
};

const COLOR_MAP = {
  info: "text-blue-600",
  success: "text-green-600",
  warning: "text-orange-600",
  error: "text-red-600",
};

const BG_MAP = {
  info: "bg-blue-100 dark:bg-blue-900/30",
  success: "bg-green-100 dark:bg-green-900/30",
  warning: "bg-orange-100 dark:bg-orange-900/30",
  error: "bg-red-100 dark:bg-red-900/30",
};

export function NotificationsClient() {
  const {
    notifications,
    isLoading,
    markAsRead,
    markAllAsRead,
    isMarkingAllAsRead,
  } = useNotifications();

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-muted rounded w-48 mb-6" />
        {[1, 2, 3, 4].map((item) => (
          <div
            key={`notif-skeleton-${item}`}
            className="h-24 bg-muted rounded-xl w-full"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {notifications.length > 0 && (
          <button
            type="button"
            disabled={isMarkingAllAsRead}
            onClick={() => markAllAsRead()}
            className="text-sm font-medium text-blue-600 hover:underline disabled:opacity-50"
          >
            {isMarkingAllAsRead ? "Marking..." : "Mark all as read"}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-xl">
            <Bell className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <h3 className="text-lg font-medium">No notifications yet</h3>
            <p className="text-sm text-muted-foreground">
              We'll notify you when something important happens.
            </p>
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon = ICON_MAP[notification.type] || Bell;
            return (
              <button
                type="button"
                key={notification._id}
                onClick={() =>
                  !notification.isRead && markAsRead(notification._id)
                }
                className={`w-full text-left flex items-start gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${
                  !notification.isRead
                    ? "bg-muted/50 border-blue-200 dark:border-blue-800 shadow-sm"
                    : "bg-card hover:bg-muted/30"
                }`}
              >
                <div
                  className={`rounded-lg p-2 ${BG_MAP[notification.type] || BG_MAP.info}`}
                >
                  <Icon
                    className={`h-5 w-5 ${COLOR_MAP[notification.type] || COLOR_MAP.info}`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{notification.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.description}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
