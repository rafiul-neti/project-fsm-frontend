import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addNewSkill,
  applyAsTechnician,
  getMyAssignedServiceRequests,
  getMySkills,
  getTechnicians,
  removeMySkill,
} from "@/api";
import type {
  GetMyAssignedServiceRequestQueryParams,
  GetTechniciansParams,
} from "@/types";

export function useApplyAsTechnician() {
  return useMutation({
    mutationFn: applyAsTechnician,
  });
}

export function useGetTechnicians(
  params: GetTechniciansParams = {},
  options: { enabled?: boolean } = {},
) {
  return useQuery({
    queryKey: ["technicians", params],
    queryFn: () => getTechnicians(params),
    enabled: options.enabled,
  });
}

export function useGetMyAssignedServiceRequests(
  params: GetMyAssignedServiceRequestQueryParams,
) {
  return useQuery({
    queryKey: ["get-my-assigned-service-requests", params],
    queryFn: () => getMyAssignedServiceRequests(params),
  });
}

export function useGetMySkills() {
  return useQuery({
    queryKey: ["get-my-skills"],
    queryFn: getMySkills,
  });
}

export function useRemoveMySkill() {
  return useMutation({
    mutationFn: removeMySkill,
  });
}

export function useAddNewSkill() {
  return useMutation({
    mutationFn: addNewSkill,
  });
}
