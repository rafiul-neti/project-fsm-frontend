"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllPayments } from "@/hooks";
import { cn } from "@/lib/utils";
import type { Payment } from "@/types";

const PAGE_SIZE = 10;
const CURRENCY = "BDT";
const COLUMN_COUNT = 8;

const paymentDetailsHref = (paymentId: string) =>
  `/payment/details?paymentId=${paymentId}`;

const formatMoney = (amount: number) =>
  `${CURRENCY} ${amount.toLocaleString("en-US")}`;

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatGateway = (gateway: string) =>
  gateway.toUpperCase() === "BKASH" ? "bKash" : gateway;

// Payment.status is a plain string, so match the common words and fall back
// to a neutral style for anything else.
const getStatusStyle = (status: string) => {
  const value = status.toUpperCase();

  if (["PAID", "COMPLETED", "SUCCESS", "SUCCEEDED"].includes(value))
    return { dot: "bg-green-600", border: "border-green-600" };
  if (["PENDING", "INITIATED", "PROCESSING"].includes(value))
    return { dot: "bg-amber-500", border: "border-amber-500" };
  if (["FAILED", "CANCELLED", "EXPIRED"].includes(value))
    return { dot: "bg-red-500", border: "border-red-500" };
  if (value.includes("REFUND"))
    return { dot: "bg-violet-500", border: "border-violet-500" };

  return { dot: "bg-slate-400", border: "border-slate-400" };
};

function PaymentRow({ payment }: { payment: Payment }) {
  const { service } = payment;
  const statusStyle = getStatusStyle(payment.status);
  const date = payment.paidAt ?? payment.createdAt;

  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-mono text-xs font-medium">
            {payment.merchantInvoiceNumber ?? payment.id.slice(0, 8)}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatGateway(payment.paymentGateway)}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex min-w-0 max-w-56 flex-col">
          <span className="truncate font-medium">{service.title}</span>
          <span className="truncate text-xs text-muted-foreground">
            {service.category.name}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex min-w-0 max-w-48 flex-col">
          <span className="truncate">{service.customer.name}</span>
          <span className="truncate text-xs text-muted-foreground">
            {service.customer.email}
          </span>
        </div>
      </TableCell>

      <TableCell>
        {service.technician ? (
          <span className="block max-w-40 truncate">
            {service.technician.name}
          </span>
        ) : (
          <span className="text-muted-foreground">Not assigned</span>
        )}
      </TableCell>

      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium tabular-nums">
            {payment.amount !== null ? formatMoney(payment.amount) : "Not set"}
          </span>
          {payment.refundedAmount !== null && (
            <span className="text-xs text-violet-600">
              Refunded {formatMoney(payment.refundedAmount)}
            </span>
          )}
        </div>
      </TableCell>

      <TableCell>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize",
            statusStyle.border,
          )}
        >
          <span className={cn("size-1.5 rounded-full", statusStyle.dot)} />
          {payment.status.replaceAll("_", " ").toLowerCase()}
        </span>
      </TableCell>

      <TableCell className="whitespace-nowrap">
        <div className="flex flex-col">
          <span>{formatDate(date)}</span>
          <span className="text-xs text-muted-foreground">
            {payment.paidAt ? "Paid" : "Created"}
          </span>
        </div>
      </TableCell>

      <TableCell className="text-right">
        <Button
          variant="outline"
          size="sm"
          render={<Link href={paymentDetailsHref(payment.id)} />}
          nativeButton={false}
        >
          View details
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default function AdminPayments() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useGetAllPayments({
    page,
    limit: PAGE_SIZE,
  });

  const payments = data?.data ?? [];
  const meta = data?.meta;

  if (isError) {
    return (
      <div
        role="alert"
        className="flex flex-col items-start gap-3 rounded-xl border border-destructive/40 bg-card p-5"
      >
        <p className="text-sm">
          We could not load the payments. Please try again.
        </p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow
                  key={`admin-payments`.split("").join(`${index}`)}
                  aria-hidden="true"
                >
                  <TableCell colSpan={COLUMN_COUNT}>
                    <div className="h-10 animate-pulse rounded-md bg-muted" />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading && payments.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={COLUMN_COUNT}
                  className="h-32 text-center text-muted-foreground"
                >
                  No payments yet. They will appear here once customers pay.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              payments.map((payment) => (
                <PaymentRow key={payment.id} payment={payment} />
              ))}
          </TableBody>
        </Table>
      </div>

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
