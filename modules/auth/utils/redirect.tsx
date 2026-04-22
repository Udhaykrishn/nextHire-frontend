"use client";

/**
 * Redirects to the specified route while replacing the current history entry
 * This prevents the current page from appearing in browser history
 * @param dashboardRoute - The route to redirect to
 */
export function redirect(dashboardRoute: string) {
  if (typeof window !== "undefined") {
    // Replace current history entry to prevent back navigation to current page
    window.history.replaceState(null, "", dashboardRoute);

    // Navigate to the dashboard route
    window.location.href = dashboardRoute;
  }
}
