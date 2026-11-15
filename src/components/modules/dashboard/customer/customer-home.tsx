"use client";

import { AlertCircle, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  useGetAllCategories,
  useGetMyPayments,
  useGetMyServiceRequests,
} from "@/hooks";
import { cn } from "@/lib/utils";
import type { Payment, ServiceRequest } from "@/types";
import { formatMoney, formatStatus, getStatusStyle } from "@/utils";

// Adjust these to your customer routes.
const routes = {
  book: "/customer/book",
  requests: "/customer/requests",
  requestDetails: (id: string) => `/customer/requests/details?requestId=${id}`,
  payments: "/customer/payments",
};

const ACTIVE_STATUSES = ["PENDING", "REVIEWED", "ASSIGNED", "IN_PROGRESS"];

const stages = [
  "Request submitted",
  "Under review",
  "Technician assigned",
  "Work in progress",
  "Completed",
];

const stageIndex: Record<string, number> = {
  PENDING: 0,
  REVIEWED: 1,
  ASSIGNED: 2,
  IN_PROGRESS: 3,
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function StatusPill({ status }: { status: string }) {
  const style = getStatusStyle(status);

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium capitalize",
        style.border,
      )}
    >
      <span className={cn("size-1.5 rounded-full", style.dot)} />
      {formatStatus(status)}
    </span>
  );
}

function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: { label: string; href: string };
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-bold tracking-tight">
          {title}
        </h2>
        {action && (
          <Link
            href={action.href}
            className="text-sm font-medium text-primary hover:underline"
          >
            {action.label}
          </Link>
        )}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ActiveRequestCard({ request }: { request: ServiceRequest }) {
  const current = stageIndex[request.status] ?? 0;

  return (
    <Panel title="Your active request">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-medium">{request.title}</p>
            <p className="text-sm text-muted-foreground">
              {request.category?.name} · Created {formatDate(request.createdAt)}
            </p>
          </div>
          <StatusPill status={request.status} />
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="flex gap-1.5"
            role="img"
            aria-label={`Step ${current + 1} of ${stages.length}: ${stages[current]}`}
          >
            {stages.map((stage, index) => (
              <span
                key={stage}
                className={cn(
                  "h-2 flex-1 rounded-full",
                  index <= current ? "bg-primary" : "bg-muted",
                )}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Step {current + 1} of {stages.length}:{" "}
            <span className="font-medium text-foreground">
              {stages[current]}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {request.technician
              ? `Technician: ${request.technician?.name}`
              : "We are finding a technician for you."}
          </p>
          <Link
            href={routes.requestDetails(request.id)}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            View request
          </Link>
        </div>
      </div>
    </Panel>
  );
}

function RecentRequests({ requests }: { requests: ServiceRequest[] }) {
  console.log(requests)
  return (
    <Panel
      title="Recent requests"
      action={{ label: "View all", href: routes.requests }}
    >
      <ul className="flex flex-col divide-y">
        {requests.map((request) => (
          <li key={request.id}>
            <Link
              href={routes.requestDetails(request.id)}
              className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 hover:text-primary"
            >
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium">
                  {request.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {request.category?.name} · {formatDate(request?.createdAt)}
                </span>
              </span>
              <StatusPill status={request.status} />
            </Link>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function FirstTimeCard() {
  return (
    <section className="flex flex-col items-start gap-5 rounded-xl border bg-card p-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-xl font-bold tracking-tight">
          Book your first service
        </h2>
        <p className="text-muted-foreground">
          You have no requests yet. Here is how it works:
        </p>
      </div>

      <ol className="flex flex-col gap-3 text-sm">
        {[
          "Choose a service and describe the problem.",
          "We review your request and assign a verified technician.",
          "Follow the job, then pay online once it is done.",
        ].map((step, index) => (
          <li key={step} className="flex items-center gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-primary">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <Link href={routes.book} className={buttonVariants({ size: "lg" })}>
        Book a service
      </Link>
    </section>
  );
}

function RecentPayments({
  payments,
  isLoading,
  isError,
}: {
  payments: Payment[];
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <Panel
      title="Recent payments"
      action={{ label: "View all", href: routes.payments }}
    >
      {isLoading && <div className="h-24 animate-pulse rounded-lg bg-muted" />}

      {isError && (
        <p className="text-sm text-muted-foreground">
          We could not load your payments.
        </p>
      )}

      {!isLoading && !isError && payments.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Your payments will appear here after you pay for a job.
        </p>
      )}

      {payments.length > 0 && (
        <ul className="flex flex-col divide-y">
          {payments.map((payment) => (
            <li
              key={payment.id}
              className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium">
                  {payment.service?.title ?? "Service payment"}
                </span>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {payment.amount !== null
                    ? formatMoney(Number(payment.amount))
                    : "Amount not set"}
                </span>
              </span>
              <StatusPill status={payment.status} />
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

function BookByCategory({
  categories,
  isLoading,
}: {
  categories: { id: string; name: string }[];
  isLoading: boolean;
}) {
  return (
    <Panel title="Book by category">
      {isLoading && <div className="h-16 animate-pulse rounded-lg bg-muted" />}

      {!isLoading && categories.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No service categories are available right now.
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`${routes.book}?categoryId=${category.id}`}
            className="rounded-full border px-3.5 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </Panel>
  );
}

export default function CustomerHome({ userName }: { userName?: string }) {
  const requestsQuery = useGetMyServiceRequests();
  const paymentsQuery = useGetMyPayments();
  const categoriesQuery = useGetAllCategories();

  const requests = requestsQuery.data?.data ?? [];
  const totalRequests = requestsQuery.data?.meta?.total ?? requests.length;
  const payments = paymentsQuery.data?.data ?? [];
  const categories = (categoriesQuery.data?.data ?? []).filter(
    (category) => category.isActive && !category.isDeleted,
  );

  const activeRequest = requests.find((request) =>
    ACTIVE_STATUSES.includes(request.status),
  );
  
  const awaitingPayment = requests
    .filter((request) => request.status === "INVOICED")
    .slice(0, 3);
  const failedPayments = payments.filter((payment) =>
    payment.status.toUpperCase().includes("FAIL"),
  );
  const hasAttention = awaitingPayment.length > 0 || failedPayments.length > 0;

  if (requestsQuery.isError) {
    return (
      <div
        role="alert"
        className="flex flex-col items-start gap-3 rounded-xl border border-destructive/40 bg-card p-5"
      >
        <p className="text-sm">
          We could not load your dashboard. Please try again.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => requestsQuery.refetch()}
        >
          Try again
        </Button>
      </div>
    );
  }

  if(requestsQuery.isLoading) {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            {userName ? `Welcome back, ${userName}` : "Welcome back"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Here is what is happening with your service requests.
          </p>
        </div>

        <Link href={routes.book} className={buttonVariants({ size: "lg" })}>
          <Plus className="mr-2 size-4" aria-hidden="true" />
          New request
        </Link>
      </div>

      {/* ---------- Needs attention ---------- */}
      {hasAttention && (
        <section
          aria-labelledby="needs-attention"
          className="rounded-xl border border-amber-500/50 bg-amber-500/5 p-5"
        >
          <h2
            id="needs-attention"
            className="flex items-center gap-2 font-heading text-lg font-bold tracking-tight"
          >
            <AlertCircle className="size-5 text-amber-600" aria-hidden="true" />
            Needs your attention
          </h2>

          <ul className="mt-4 flex flex-col gap-3">
            {awaitingPayment.map((request) => (
              <li
                key={request.id}
                className="flex flex-wrap items-center justify-between gap-3"
              >
                <p className="text-sm">
                  <span className="font-medium">{request.title}</span> is ready
                  for payment
                  {request.finalAmount !== null &&
                    ` (${formatMoney(Number(request.finalAmount))})`}
                  .
                </p>
                <Link
                  href={routes.requestDetails(request.id)}
                  className={buttonVariants({ size: "sm" })}
                >
                  Pay now
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Link>
              </li>
            ))}

            {failedPayments.map((payment) => (
              <li
                key={payment.id}
                className="flex flex-wrap items-center justify-between gap-3"
              >
                <p className="text-sm">
                  The payment for{" "}
                  <span className="font-medium">
                    {payment.service?.title ?? "your service"}
                  </span>{" "}
                  did not go through.
                </p>
                <Link
                  href={routes.requestDetails(payment.serviceId)}
                  className={buttonVariants({ size: "sm", variant: "outline" })}
                >
                  Try again
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {requestsQuery.isLoading ? (
        <div
          aria-busy="true"
          className="grid animate-pulse gap-6 lg:grid-cols-3"
        >
          <div className="h-80 rounded-xl bg-muted lg:col-span-2" />
          <div className="h-80 rounded-xl bg-muted" />
        </div>
      ) : totalRequests === 0 ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FirstTimeCard />
          </div>
          <BookByCategory
            categories={categories}
            isLoading={categoriesQuery.isLoading}
          />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            {activeRequest && <ActiveRequestCard request={activeRequest} />}
            <RecentRequests requests={requests.slice(0, 5)} />
          </div>

          <div className="flex flex-col gap-6">
            <RecentPayments
              payments={payments}
              isLoading={paymentsQuery.isLoading}
              isError={paymentsQuery.isError}
            />
            <BookByCategory
              categories={categories}
              isLoading={categoriesQuery.isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}
