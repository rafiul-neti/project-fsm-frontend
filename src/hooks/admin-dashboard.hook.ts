import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAdminDashboardStats, getAllUsers } from "@/api";

export function useGetAdminDashboardStats() {
  return useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: getAdminDashboardStats,
  });
}

export function useGetAllUsers(params: {
  page?: number;
  limit?: number;
  name?: string;
  email?: string;
  sortOrder?: string;
}) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getAllUsers(params),
    placeholderData: keepPreviousData, // keeps the table steady while paging or searching
  });
}
