
"use client";

import { useGetMyAssignedServiceRequests } from "@/hooks";
import type { AssignedServiceRequest, ServiceRequestStatus } from "@/types";

const statusStyles: Record<ServiceRequestStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  REVIEWED: "bg-blue-100 text-blue-800",
  ASSIGNED: "bg-indigo-100 text-indigo-800",
  IN_PROGRESS: "bg-orange-100 text-orange-800",
  COMPLETED: "bg-green-100 text-green-800",
  INVOICED: "bg-purple-100 text-purple-800",
  PAID: "bg-emerald-100 text-emerald-800",
  CLOSED: "bg-gray-100 text-gray-700",
  CANCELLED: "bg-red-100 text-red-800",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: ServiceRequestStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

function RequestCard({ request }: { request: AssignedServiceRequest }) {
  return (
    <article className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-sm">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <h3 className="font-semibold">{request.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {request.category.name}
          </p>
        </div>

        <StatusBadge status={request.status} />
      </div>

      <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <p className="text-xs text-muted-foreground">Customer</p>
          <p className="mt-1 font-medium">{request.customer.name}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Location</p>
          <p className="mt-1 font-medium">{request.address}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Request Date</p>
          <p className="mt-1 font-medium">{formatDate(request.createdAt)}</p>
        </div>

        {request.customer.contactNumber && (
          <div>
            <p className="text-xs text-muted-foreground">Contact Number</p>
            <p className="mt-1 font-medium">{request.customer.contactNumber}</p>
          </div>
        )}
      </div>
    </article>
  );
}

export default function RecentRequests() {
  const { data, isLoading, isError } = useGetMyAssignedServiceRequests({
    page: 1,
    limit: 6,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const requests = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="rounded-xl border p-8 text-center text-sm text-muted-foreground">
        Loading your service requests...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
        Unable to load your service requests. Please try again.
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <h3 className="font-semibold">No service requests yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your assigned service requests will appear here once a job is assigned
          to you.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Showing {requests.length} of {data?.meta?.total ?? 0} requests
      </p>

      <div className="grid gap-4">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
}
