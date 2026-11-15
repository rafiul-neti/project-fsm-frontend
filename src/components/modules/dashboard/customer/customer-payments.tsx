"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyPayments } from "@/hooks";
import type { Payment } from "@/types";

function formatDate(date: string | null) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatAmount(amount: number | null) {
  if (amount === null) return "—";

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatStatus(status: string) {
  return status
    .replace(/[_-]/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getTransactionId(payment: Payment) {
  return (
    payment.bkashTrxId ||
    payment.bkashPaymentId ||
    payment.merchantInvoiceNumber ||
    "—"
  );
}

export default function CustomerPayments() {
  const { data: response, isPending, isError } = useGetMyPayments();

  const payments: Payment[] = response?.data ?? [];

  if (isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`customer-payments-page`.split("").join(`${index}`)}
            className="h-12 animate-pulse rounded-md bg-muted"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border bg-background p-8 text-center">
        <h2 className="font-semibold">Unable to load payments</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong while fetching your payment history. Please try
          again later.
        </p>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="rounded-xl border bg-background px-6 py-16 text-center">
        <h2 className="text-lg font-semibold">No payments found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your payment history will appear here once you make a payment.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="border-b p-4">
        <h2 className="font-semibold">Payment History</h2>
        <p className="text-sm text-muted-foreground">
          {payments.length} {payments.length === 1 ? "payment" : "payments"}{" "}
          found
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Gateway</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">
                  <span
                    className="block max-w-32 truncate"
                    title={payment.serviceId}
                  >
                    {payment.serviceId}
                  </span>
                </TableCell>

                <TableCell className="whitespace-nowrap font-medium">
                  {formatAmount(payment.amount)}
                </TableCell>

                <TableCell>{payment.paymentGateway}</TableCell>

                <TableCell>
                  <span
                    className="block max-w-36 truncate text-sm"
                    title={getTransactionId(payment)}
                  >
                    {getTransactionId(payment)}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                    {formatStatus(payment.status)}
                  </span>
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {formatDate(payment.paidAt ?? payment.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
