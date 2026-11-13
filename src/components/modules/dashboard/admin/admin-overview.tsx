"use client";

import {
  Banknote,
  ClipboardList,
  type LucideIcon,
  UserCheck,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { useGetAdminDashboardStats } from "@/hooks";
import { cn } from "@/lib/utils";

// Adjust these to your admin routes (or import them from "@/routes").
const links = {
  requests: "/dashboard/service-requests",
  technicians: "/dashboard/applications",
};

const CURRENCY = "BDT";

const requestStatuses = [
  { key: "PENDING", label: "Pending", color: "bg-amber-500" },
  { key: "REVIEWED", label: "Reviewed", color: "bg-sky-500" },
  { key: "ASSIGNED", label: "Assigned", color: "bg-blue-500" },
  { key: "IN_PROGRESS", label: "In progress", color: "bg-violet-500" },
  { key: "COMPLETED", label: "Completed", color: "bg-teal-500" },
  { key: "INVOICED", label: "Invoiced", color: "bg-orange-500" },
  { key: "PAID", label: "Paid", color: "bg-green-600" },
  { key: "CLOSED", label: "Closed", color: "bg-slate-400" },
  { key: "CANCELLED", label: "Cancelled", color: "bg-red-500" },
] as const;

const applicationStatuses = [
  { key: "PENDING", label: "Pending", color: "bg-amber-500" },
  { key: "APPROVED", label: "Approved", color: "bg-green-600" },
  { key: "REJECTED", label: "Rejected", color: "bg-red-500" },
] as const;

const formatNumber = (value: number) => value.toLocaleString("en-US");

const StatCard = ({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
}) => (
  <div className="flex flex-col gap-3 rounded-xl border bg-card p-5">
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
        <Icon size={18} aria-hidden="true" />
      </span>
    </div>
    <p className="font-heading text-3xl font-bold tracking-tight">{value}</p>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

const OverviewSkeleton = () => (
  <output
    aria-busy="true"
    aria-label="Loading dashboard"
    className="flex animate-pulse flex-col gap-6"
  >
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`fsm`.split("").join(`${index}`)}
          className="h-31 rounded-xl bg-muted"
        />
      ))}
    </div>
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="h-96 rounded-xl bg-muted lg:col-span-2" />
      <div className="h-96 rounded-xl bg-muted" />
    </div>
  </output>
);

export default function AdminOverview() {
  const { data, isLoading, isError, refetch } = useGetAdminDashboardStats();
  const stats = data?.data;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          A quick look at requests, revenue and technician applications.
        </p>
      </div>

      {isLoading && <OverviewSkeleton />}

      {isError && (
        <div
          role="alert"
          className="flex flex-col items-start gap-3 rounded-xl border border-destructive/40 bg-card p-5"
        >
          <p className="text-sm">
            We could not load the dashboard stats. Please try again.
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      )}

      {stats && <OverviewContent stats={stats} />}
    </div>
  );
}

type Stats = NonNullable<
  ReturnType<typeof useGetAdminDashboardStats>["data"]
>["data"];

function OverviewContent({ stats }: { stats: Stats }) {
  const { serviceRequestsByStatus, techniciansByApplicationStatus } = stats;

  const totalRequests = Object.values(serviceRequestsByStatus).reduce(
    (sum, count) => sum + count,
    0,
  );
  const activeJobs =
    serviceRequestsByStatus.ASSIGNED + serviceRequestsByStatus.IN_PROGRESS;
  const pendingRequests = serviceRequestsByStatus.PENDING;
  const pendingApplications = techniciansByApplicationStatus.PENDING;

  const attention = [
    {
      label: "Requests waiting for review",
      count: pendingRequests,
      href: links.requests,
      action: "Review requests",
    },
    {
      label: "Technician applications to review",
      count: pendingApplications,
      href: links.technicians,
      action: "Review applications",
    },
  ];
  const allCaughtUp = attention.every((item) => item.count === 0);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Banknote}
          label="Total revenue"
          value={`${CURRENCY} ${formatNumber(stats.totalRevenue)}`}
        />
        <StatCard
          icon={ClipboardList}
          label="Total requests"
          value={formatNumber(totalRequests)}
          hint="All time"
        />
        <StatCard
          icon={Wrench}
          label="Active jobs"
          value={formatNumber(activeJobs)}
          hint="Assigned and in progress"
        />
        <StatCard
          icon={UserCheck}
          label="Pending applications"
          value={formatNumber(pendingApplications)}
          hint="Technicians waiting for a decision"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ---------- Requests by status ---------- */}
        <section
          aria-labelledby="requests-by-status"
          className="rounded-xl border bg-card p-5 lg:col-span-2"
        >
          <div className="flex items-center justify-between gap-3">
            <h2
              id="requests-by-status"
              className="font-heading text-lg font-bold tracking-tight"
            >
              Requests by status
            </h2>
            <Link
              href={links.requests}
              className="text-sm font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          {totalRequests === 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              No service requests yet. They will appear here as customers book.
            </p>
          )}

          <ul className="mt-5 flex flex-col gap-4">
            {requestStatuses.map(({ key, label, color }) => {
              const count = serviceRequestsByStatus[key];
              const percent = totalRequests ? (count / totalRequests) * 100 : 0;

              return (
                <li key={key} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className={cn("size-2 rounded-full", color)} />
                      {label}
                    </span>
                    <span className="font-medium tabular-nums">{count}</span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="h-2 overflow-hidden rounded-full bg-muted"
                  >
                    <div
                      className={cn("h-full rounded-full", color)}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="flex flex-col gap-6">
          {/* ---------- Needs attention ---------- */}
          <section
            aria-labelledby="needs-attention"
            className="rounded-xl border bg-card p-5"
          >
            <h2
              id="needs-attention"
              className="font-heading text-lg font-bold tracking-tight"
            >
              Needs your attention
            </h2>

            {allCaughtUp ? (
              <p className="mt-2 text-sm text-muted-foreground">
                You are all caught up. Nothing is waiting for review.
              </p>
            ) : (
              <ul className="mt-4 flex flex-col gap-4">
                {attention.map(({ label, count, href, action }) => (
                  <li key={label} className="flex flex-col items-start gap-2">
                    <p className="text-sm flex items-center">
                      <span
                        className={cn(
                          "mr-1.5 font-heading text-xl font-bold",
                          count > 0 && "text-amber-600",
                        )}
                      >
                        {count}
                      </span>
                      {label}
                    </p>
                    {count > 0 && (
                      <Link
                        href={href}
                        className={`${buttonVariants({
                          size: "sm",
                        })}`}
                      >
                        {action}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* ---------- Technician applications ---------- */}
          <section
            aria-labelledby="applications"
            className="rounded-xl border bg-card p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <h2
                id="applications"
                className="font-heading text-lg font-bold tracking-tight"
              >
                Technician applications
              </h2>
              <Link
                href={links.technicians}
                className="text-sm font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </div>

            <ul className="mt-4 flex flex-col gap-3">
              {applicationStatuses.map(({ key, label, color }) => (
                <li
                  key={key}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span className={cn("size-2 rounded-full", color)} />
                    {label}
                  </span>
                  <span className="font-medium tabular-nums">
                    {techniciansByApplicationStatus[key]}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
