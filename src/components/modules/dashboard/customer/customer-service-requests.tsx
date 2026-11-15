"use client";

import { useGetMyServiceRequests } from "@/hooks";
import type { ServiceRequest } from "@/types";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

function formatStatus(status: ServiceRequest["status"]) {
  return String(status)
    .replace(/[_-]/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function CustomerServiceRequests() {
  const { data: response, isPending, isError } = useGetMyServiceRequests();

  const requests: ServiceRequest[] = response?.data ?? [];

  if (isPending) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`customer-service-requests`.split("").join(`${index}`)}
            className="h-48 animate-pulse rounded-xl border bg-background"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border bg-background p-8 text-center">
        <h2 className="font-semibold">Unable to load your requests</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong while fetching your service requests. Please try
          again later.
        </p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-xl border bg-background px-6 py-16 text-center">
        <h2 className="text-lg font-semibold">No service requests yet</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          You haven't submitted any service requests. Your requests will appear
          here once you create one.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Your Requests</h2>
          <p className="text-sm text-muted-foreground">
            You have {requests.length}{" "}
            {requests.length === 1 ? "request" : "requests"}.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => (
          <article
            key={request.id}
            className="flex flex-col rounded-xl border bg-background p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold leading-6">{request.title}</h3>

              <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {formatStatus(request.status)}
              </span>
            </div>

            <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
              {request.description}
            </p>

            <div className="mt-5 space-y-3 border-t pt-4 text-sm">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Service Address
                </p>
                <p className="mt-1">{request.address}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Submitted On
                </p>
                <p className="mt-1">{formatDate(request.createdAt)}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
