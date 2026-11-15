import { useQuery } from "@tanstack/react-query";
import { getAllServiceRequests, getServiceRequestDetails } from "@/api";
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
