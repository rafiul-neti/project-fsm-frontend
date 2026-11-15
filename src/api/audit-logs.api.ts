import apiClient from "@/lib/apiClient";
import type { ApiResponse, TAuditLog, TGetAllAuditLogsQuery } from "@/types";

export function getAllAuditLogs(query: TGetAllAuditLogsQuery) {
  return apiClient<ApiResponse<TAuditLog[]>>("/admin/audit-logs", {
    query,
  });
}
