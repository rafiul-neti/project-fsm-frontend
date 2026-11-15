import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  AssignServiceRequestPayload,
  CreateServiceRequestPayload,
  ServiceRequest,
  ServiceRequestDetails,
  ServiceRequestsQueryParams,
} from "@/types";

export function getAllServiceRequests(queryParams: ServiceRequestsQueryParams) {
  return apiClient<ApiResponse<ServiceRequest[]>>("/service-requests", {
    query: queryParams,
  });
}

export function getServiceRequestDetails(requestId: string) {
  return apiClient<ApiResponse<ServiceRequestDetails>>(
    `/service-requests/${requestId}`,
  );
}

export function getMyServiceRequests() {
  return apiClient<ApiResponse<ServiceRequest[]>>("/service-requests/me");
}

export function createServiceRequests(payload: CreateServiceRequestPayload) {
  return apiClient("/service-requests", {
    method: "POST",
    body: payload,
  });
}

export function assignServiceRequest({
  serviceRequestId,
  technicianId,
}: AssignServiceRequestPayload) {
  return apiClient<ApiResponse<unknown>>(
    `/service-requests/${serviceRequestId}/assign`,
    {
      method: "PATCH",
      body: { technicianId },
    },
  );
}

export function reviewServiceRequests(serviceRequestId: string) {
  return apiClient(`/service-requests/${serviceRequestId}/review`, {
    method: "PATCH",
  });
}
