import AppLayout from "@/components/app-layout";
import UserProtectedLayout from "./layout-client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <UserProtectedLayout>{children}</UserProtectedLayout>
    </AppLayout>
  );
}
