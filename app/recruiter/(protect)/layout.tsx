import AppLayout from "@/components/app-layout";
import RecruiterProtectedLayout from "./recruiter-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <RecruiterProtectedLayout>{children}</RecruiterProtectedLayout>
    </AppLayout>
  );
}
