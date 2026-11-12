import type React from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function TechnicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard roles={["TECHNICIAN"]}>
      <DashboardShell userRole="TECHNICIAN">{children}</DashboardShell>
    </RoleGuard>
  );
}
