"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllAuditLogs } from "@/hooks";
import type { TGetAllAuditLogsQuery } from "@/types";
import { AuditLogsFilters } from "./audit-logs-filters";
import { AuditLogsPagination } from "./audit-logs-pagination";
import { AuditLogsSkeleton } from "./audit-logs-skeleton";
import { AuditLogsTable } from "./audit-logs-table";

export function AuditLogsIsland() {
  const router = useRouter();
  const params = useSearchParams();

  const query: TGetAllAuditLogsQuery = {
    action: params.get("action") || undefined,
    entityType: params.get("entityType") || undefined,
    actorId: params.get("actorId") || undefined,
    serviceRequestId: params.get("serviceRequestId") || undefined,
    page: Number(params.get("page") ?? 1),
    limit: 10,
    sortOrder: params.get("sortOrder") === "asc" ? "asc" : "desc",
  };

  const { data, isLoading, isError, isFetching } = useGetAllAuditLogs(query);

  function setParam(key: string, value?: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.set("page", "1");
    router.push(`?${next.toString()}`, { scroll: false });
  }

  return (
    <div className="space-y-4">
      <AuditLogsFilters query={query} onChange={setParam} />

      {isLoading ? (
        <AuditLogsSkeleton rowsOnly />
      ) : isError || !data ? (
        <p className="text-sm text-destructive">Could not load audit logs.</p>
      ) : (
        <div className={isFetching ? "opacity-60 transition-opacity" : ""}>
          <AuditLogsTable logs={data.data} />
          <AuditLogsPagination
            meta={data.meta!}
            onPageChange={(page) => setParam("page", String(page))}
          />
        </div>
      )}
    </div>
  );
}
