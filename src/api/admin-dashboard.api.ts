import apiClient from "@/lib/apiClient";
import type { AdminDashboardStats, ApiResponse } from "@/types";

export function getAdminDashboardStats() {
  return apiClient<ApiResponse<AdminDashboardStats>>("/admin/dashboard-stats");
}
