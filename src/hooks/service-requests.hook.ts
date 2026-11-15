import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  createServiceRequests,
  getAllServiceRequests,
  getMyServiceRequests,
  getServiceRequestDetails,
} from "@/api";
import type { ServiceRequestsQueryParams } from "@/types";

export function useGetAllServiceRequests(
  queryParams: ServiceRequestsQueryParams,
) {
  return useQuery({
    queryKey: ["service-requests-admin", queryParams],
    queryFn: () => getAllServiceRequests(queryParams),
  });
}

export function useGetServiceRequestDetails(requestId: string) {
  return useQuery({
    queryKey: ["service-request", requestId],
    queryFn: () => getServiceRequestDetails(requestId),
    enabled: !!requestId,
  });
}

export function useGetMyServiceRequests() {
  return useQuery({
    queryKey: ["my-service-requests"],
    queryFn: getMyServiceRequests,
    placeholderData: keepPreviousData,
  });
}

export function useCreateServiceRequest() {
  return useMutation({
    mutationFn: createServiceRequests,
  });
}
