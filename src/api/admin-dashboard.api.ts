import apiClient from "@/lib/apiClient";
import type {
  AdminDashboardStats,
  ApiResponse,
  TechnicianApplication,
  TechnicianApplicationDetails,
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
  return apiClient<ApiResponse<TechnicianApplicationDetails>>(
    `/admin/technicians-applications/${technicianId}`,
  );
}

export function updateTechnicianStatus(payload: {
  technicianId: string;
  decision: "APPROVED" | "REJECTED";
}) {
  return apiClient(
    `/technicians/${payload.technicianId}/update-application-status`,
    {
      method: "PATCH",
      body: { decision: payload.decision },
    },
  );
}
