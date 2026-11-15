import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllAuditLogs } from "@/api/audit-logs.api";
import type { TGetAllAuditLogsQuery } from "@/types";

export function useGetAllAuditLogs(query: TGetAllAuditLogsQuery) {
  return useQuery({
    queryKey: ["admin-all-audit-logs", query],
    queryFn: () => getAllAuditLogs(query),
    placeholderData: keepPreviousData,
  });
}
