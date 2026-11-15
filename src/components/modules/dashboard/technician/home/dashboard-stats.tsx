
"use client";

import { useGetMyAssignedServiceRequests } from "@/hooks";
import type { GetMyAssignedServiceRequestQueryParams } from "@/types";

const getParams = (
  status?: GetMyAssignedServiceRequestQueryParams["status"],
): GetMyAssignedServiceRequestQueryParams => ({
  page: 1,
  limit: 1,
  sortBy: "createdAt",
  sortOrder: "desc",
  ...(status && { status }),
});

function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

export default function DashboardStats() {
  const totalQuery = useGetMyAssignedServiceRequests(getParams());

  const assignedQuery = useGetMyAssignedServiceRequests(getParams("ASSIGNED"));

  const inProgressQuery = useGetMyAssignedServiceRequests(
    getParams("IN_PROGRESS"),
  );

  const completedQuery = useGetMyAssignedServiceRequests(
    getParams("COMPLETED"),
  );

  const getCount = (isLoading: boolean, isError: boolean, total?: number) => {
    if (isLoading) return "...";
    if (isError) return "—";
    return total ?? 0;
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Requests"
        value={getCount(
          totalQuery.isLoading,
          totalQuery.isError,
          totalQuery.data?.meta?.total,
        )}
        description="All your assigned requests"
      />

      <StatCard
        title="Assigned"
        value={getCount(
          assignedQuery.isLoading,
          assignedQuery.isError,
          assignedQuery.data?.meta?.total,
        )}
        description="Jobs waiting to be started"
      />

      <StatCard
        title="In Progress"
        value={getCount(
          inProgressQuery.isLoading,
          inProgressQuery.isError,
          inProgressQuery.data?.meta?.total,
        )}
        description="Jobs currently being handled"
      />

      <StatCard
        title="Completed"
        value={getCount(
          completedQuery.isLoading,
          completedQuery.isError,
          completedQuery.data?.meta?.total,
        )}
        description="Successfully completed jobs"
      />
    </div>
  );
}
