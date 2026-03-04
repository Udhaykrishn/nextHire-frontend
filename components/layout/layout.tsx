import React from "react";
import AppLayout from "../app-layout";
import ProtectedLayout from "./layout-client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <ProtectedLayout navItems={[]}>{children}</ProtectedLayout>
    </AppLayout>
  );
}
