import apiClient from "@/lib/apiClient";
import type { AdminDashboardStats, ApiResponse, User } from "@/types";

export function getAdminDashboardStats() {
  return apiClient<ApiResponse<AdminDashboardStats>>("/admin/dashboard-stats");
}

export function getAllUsers(params: {
  page?: number;
  limit?: number;
  name?: string;
  email?: string;
  sortOrder?: string;
}) {
  return apiClient<ApiResponse<User[]>>("/admin/get-all-users", {
    query: params,
  });
}
