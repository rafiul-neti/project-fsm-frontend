import apiClient from "@/lib/apiClient";
import type {
  AdminDashboardStats,
  ApiResponse,
  TechnicianApplication,
  User,
} from "@/types";

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

export function getTechnicianApplications() {
  return apiClient<ApiResponse<TechnicianApplication[]>>(
    "/admin/technicians-applications",
  );
}

export function getTechnicianDetails(technicianId: string) {
  return apiClient(`/admin/technicians-applications/${technicianId}`);
}
