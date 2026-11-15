import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
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
