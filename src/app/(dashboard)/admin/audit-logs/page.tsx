import { Suspense } from "react";
import { AuditLogsIsland } from "@/components/modules/dashboard/admin/audit-logs/audit-logs-island";
import { AuditLogsSkeleton } from "@/components/modules/dashboard/admin/audit-logs/audit-logs-skeleton";

export default function AuditLogsPage() {
  return (
    <section className="space-y-6 p-4 md:p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Audit Logs</h1>
        <p className="text-sm text-muted-foreground">
          A record of who did what across the system.
        </p>
      </header>

      <Suspense fallback={<AuditLogsSkeleton />}>
        <AuditLogsIsland />
      </Suspense>
    </section>
  );
}
