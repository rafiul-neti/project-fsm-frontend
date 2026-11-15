import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  ApplyTechnicianPayload,
  AssignedServiceRequest,
  GetMyAssignedServiceRequestQueryParams,
  GetTechniciansParams,
  Technician,
  TechnicianSkill,
} from "@/types";

export function applyAsTechnician(payload: ApplyTechnicianPayload) {
  const formData = new FormData();

  formData.append("license", payload.license);
  formData.append("data", JSON.stringify(payload.data));

  return apiClient("/technicians/apply", {
    method: "POST",
    body: formData,
  });
}

export function getTechnicians(params: GetTechniciansParams = {}) {
  return apiClient<ApiResponse<Technician[]>>("/technicians", {
    query: params,
  });
}

export function getMyAssignedServiceRequests(
  queryParams: GetMyAssignedServiceRequestQueryParams,
) {
  return apiClient<ApiResponse<AssignedServiceRequest[]>>(
    "/service-requests/assigned-to-me",
    {
      query: queryParams,
    },
  );
}

export function getMySkills() {
  return apiClient<ApiResponse<TechnicianSkill[]>>("/technicians/me/skills");
}

export function removeMySkill(categoryId: string) {
  return apiClient(`/technicians/me/skills/${categoryId}`, {
    method: "DELETE",
  });
}

export function addNewSkill(categoryId: string) {
  return apiClient("/technicians/me/skills", {
    method: "POST",
    body: { categoryId },
  });
}
