import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  assignServiceRequest,
  createServiceRequests,
  getAllServiceRequests,
  getMyServiceRequests,
  getServiceRequestDetails,
  reviewServiceRequests,
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

export function useAssignServiceRequest() {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignServiceRequest,
  });
}

export function useReviewServiceRequest() {
  return useMutation({
    mutationFn: reviewServiceRequests,
  });
}
