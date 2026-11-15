import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
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
