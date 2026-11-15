"use client";

import type { UseMutateFunction } from "@tanstack/react-query";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllServiceRequests, useReviewServiceRequest } from "@/hooks";
import { cn } from "@/lib/utils";
import type { ServiceRequest, ServiceRequestStatus } from "@/types";
import { formatMoney, formatStatus, getStatusStyle } from "@/utils";

// import {
//   formatMoney,
//   formatStatus,
//   getStatusStyle,
// } from "../payments/payment-utils";

const PAGE_SIZE = 10;
const COLUMN_COUNT = 8;

const serviceRequestDetailsHref = (requestId: string) =>
  `/admin/service-requests/details?requestId=${requestId}`;

const requestStatuses: ServiceRequestStatus[] = [
  "PENDING",
  "REVIEWED",
  "ASSIGNED",
  "IN_PROGRESS",
  "COMPLETED",
  "INVOICED",
  "PAID",
  "CLOSED",
  "CANCELLED",
];

type StatusFilter = "ALL" | ServiceRequestStatus;

const toLabel = (status: string) => {
  const text = formatStatus(status);
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const statusItems = [
  { value: "ALL", label: "All statuses" },
  ...requestStatuses.map((status) => ({
    value: status,
    label: toLabel(status),
  })),
];

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const useDebouncedValue = (value: string, delay = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
};

function RequestRow({
  request,
  reviewRequest,
  requestReviewing,
}: {
  request: ServiceRequest;
  reviewRequest: UseMutateFunction<any, Error, string, unknown>;
  requestReviewing: boolean;
}) {
  const statusStyle = getStatusStyle(request.status);

  return (
    <TableRow>
      <TableCell>
        <div className="flex min-w-0 max-w-64 flex-col">
          <span className="truncate font-medium">{request.title}</span>
          <span className="truncate text-xs text-muted-foreground">
            {request.address}
          </span>
        </div>
      </TableCell>

      <TableCell>{request.category.name}</TableCell>

      <TableCell>
        <div className="flex min-w-0 max-w-48 flex-col">
          <span className="truncate">{request.customer.name}</span>
          <span className="truncate text-xs text-muted-foreground">
            {request.customer.email}
          </span>
        </div>
      </TableCell>

      <TableCell>
        {request.technician ? (
          <span className="block max-w-40 truncate">
            {request.technician.name}
          </span>
        ) : (
          <span className="text-muted-foreground">Not assigned</span>
        )}
      </TableCell>

      <TableCell>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium capitalize",
            statusStyle.border,
          )}
        >
          <span className={cn("size-1.5 rounded-full", statusStyle.dot)} />
          {formatStatus(request.status)}
        </span>
      </TableCell>

      <TableCell className="whitespace-nowrap tabular-nums">
        {request.finalAmount !== null ? (
          formatMoney(Number(request.finalAmount))
        ) : (
          <span className="text-muted-foreground">Not set</span>
        )}
      </TableCell>

      <TableCell className="whitespace-nowrap text-muted-foreground">
        {formatDate(request.createdAt)}
      </TableCell>

      <TableCell className="text-right">
        <Button
          disabled={requestReviewing}
          variant="outline"
          className={`border border-primary rounded text-primary`}
          size="xs"
          render={<Link href={serviceRequestDetailsHref(request.id)} />}
          nativeButton={false}
          onClick={() => {
            reviewRequest(request.id);
          }}
        >
          {requestReviewing ? (
            <div className="flex items-center gap-0.5"> 
              <Spinner /> <span>Redirecting</span>
            </div>
          ) : (
            "Review"
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default function AdminServiceRequests() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<StatusFilter>("ALL");
  const [search, setSearch] = useState("");

  const searchTerm = useDebouncedValue(search.trim());

  const { data, isLoading, isError, refetch } = useGetAllServiceRequests({
    page,
    limit: PAGE_SIZE,
    sortBy: "createdAt",
    sortOrder: "desc",
    ...(status !== "ALL" && { status }),
    ...(searchTerm && { searchTerm }),
  });

  const { mutate: reviewRequest, isPending: requestReviewing } =
    useReviewServiceRequest();

  const requests = data?.data ?? [];
  const meta = data?.meta;
  const hasFilters = status !== "ALL" || Boolean(searchTerm);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            aria-label="Search requests by title or address"
            placeholder="Search by title or address"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3"
          />
        </div>

        <Select
          items={statusItems}
          value={status}
          onValueChange={(value) => {
            setStatus((value ?? "ALL") as StatusFilter);
            setPage(1);
          }}
        >
          <SelectTrigger
            aria-label="Filter by status"
            className="h-10 w-full sm:w-52"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            {statusItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isError ? (
        <div
          role="alert"
          className="flex flex-col items-start gap-3 rounded-xl border border-destructive/40 bg-card p-5"
        >
          <p className="text-sm">
            We could not load the service requests. Please try again.
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : (
        <div className="rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Final amount</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="">
                  <span className="">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading &&
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow
                    key={`admin-service-requests`.split("").join(`${index}`)}
                    aria-hidden="true"
                  >
                    <TableCell colSpan={COLUMN_COUNT}>
                      <div className="h-10 animate-pulse rounded-md bg-muted" />
                    </TableCell>
                  </TableRow>
                ))}

              {!isLoading && requests.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={COLUMN_COUNT}
                    className="h-32 text-center text-muted-foreground"
                  >
                    {hasFilters
                      ? "No service requests match your filters."
                      : "No service requests yet. They will appear here as customers book."}
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                requests.map((request) => (
                  <RequestRow
                    key={request.id}
                    request={request}
                    reviewRequest={reviewRequest}
                    requestReviewing={requestReviewing}
                  />
                ))}
            </TableBody>
          </Table>
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page <= 1}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page >= meta.totalPages}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
