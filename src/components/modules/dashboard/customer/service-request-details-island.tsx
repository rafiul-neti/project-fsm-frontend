"use client";

import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetServiceRequestDetails } from "@/hooks";
import type { ServiceRequestDetails } from "@/types";

function formatDate(date: string | null) {
  if (!date) return "Not available";

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function formatAmount(amount: string | number | null) {
  if (amount === null) return "Not available";

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(Number(amount));
}

function formatStatus(status: string) {
  return status
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

function getStatusVariant(status: string) {
  switch (status) {
    case "COMPLETED":
    case "CLOSED":
    case "PAID":
      return "default";

    case "CANCELLED":
      return "destructive";

    case "IN_PROGRESS":
    case "ASSIGNED":
      return "secondary";

    default:
      return "outline";
  }
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-medium wrap-break-word">
        {value || "Not available"}
      </p>
    </div>
  );
}

function PersonCard({
  title,
  person,
}: {
  title: string;
  person: ServiceRequestDetails["customer"] | null;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {person ? (
          <>
            <DetailItem label="Name" value={person.name} />
            <DetailItem label="Email" value={person.email} />
            <DetailItem label="Contact Number" value={person.contactNumber} />
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            No {title.toLowerCase()} assigned yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function Attachments({ title }: { title: string }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">{title}</h3>
    </div>
  );
}

function RequestDetails({ request }: { request: ServiceRequestDetails }) {
  return (
    <div className="space-y-6">
      {/* Request overview */}
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>{request.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Request ID: {request.id}
            </p>
          </div>

          <Badge className="border px-3 py-1 rounded-full" variant={getStatusVariant(request.status)}>
            {formatStatus(request.status)}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-5">
          <div>
            <p className="mb-1 text-sm text-muted-foreground">Description</p>
            <p className="whitespace-pre-wrap text-sm">{request.description}</p>
          </div>

          <Separator />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem label="Category" value={request.category.name} />
            <DetailItem label="Service Address" value={request.address} />
            <DetailItem
              label="Final Amount"
              value={formatAmount(request.finalAmount)}
            />
            <DetailItem
              label="Created At"
              value={formatDate(request.createdAt)}
            />
            <DetailItem
              label="Last Updated"
              value={formatDate(request.updatedAt)}
            />
            <DetailItem
              label="Started At"
              value={formatDate(request.startedAt)}
            />
            <DetailItem
              label="Completed At"
              value={formatDate(request.completedAt)}
            />
            <DetailItem
              label="Cancelled At"
              value={formatDate(request.cancelledAt)}
            />
          </div>

          {request.cancellationReason && (
            <>
              <Separator />
              <div>
                <p className="mb-1 text-sm font-medium">Cancellation Reason</p>
                <p className="text-sm text-muted-foreground">
                  {request.cancellationReason}
                </p>
              </div>
            </>
          )}

          {request.completionNotes && (
            <>
              <Separator />
              <div>
                <p className="mb-1 text-sm font-medium">Completion Notes</p>
                <p className="text-sm text-muted-foreground">
                  {request.completionNotes}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Customer and technician */}
      <div className="grid gap-6 md:grid-cols-2">
        <PersonCard title="Customer" person={request.customer} />
        <PersonCard title="Technician" person={request.technician} />
      </div>

      {/* Assignment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Assignment Information</CardTitle>
        </CardHeader>

        <CardContent>
          <DetailItem
            label="Assigned By"
            value={request.assignedBy?.name ?? null}
          />
        </CardContent>
      </Card>

      {/* Attachments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Request Files</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Attachments title="Initial Attachments" />

          <Separator />

          <Attachments
            title="Completion Photos"
            // files={request.completionPhotoUrls}
          />
        </CardContent>
      </Card>

      {/* Payment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment Information</CardTitle>
        </CardHeader>

        <CardContent>
          {request.payment ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem
                label="Payment Status"
                value={formatStatus(request.payment.status)}
              />
              <DetailItem
                label="Amount"
                value={formatAmount(request.payment.amount)}
              />
              <DetailItem
                label="Payment Gateway"
                value={request.payment.paymentGateway}
              />
              <DetailItem
                label="Transaction ID"
                value={request.payment.bkashTrxId}
              />
              <DetailItem
                label="Paid At"
                value={formatDate(request.payment.paidAt)}
              />
              <DetailItem
                label="Refunded Amount"
                value={formatAmount(request.payment.refundedAmount)}
              />
              <DetailItem
                label="Refunded At"
                value={formatDate(request.payment.refundedAt)}
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No payment information available.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Customer Feedback</CardTitle>
        </CardHeader>

        <CardContent>
          {request.feedback ? (
            <div className="space-y-3">
              <DetailItem
                label="Rating"
                value={`${request.feedback.rating} / 5`}
              />

              <DetailItem label="Comment" value={request.feedback.comment} />

              <DetailItem
                label="Submitted At"
                value={formatDate(request.feedback.createdAt)}
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No feedback submitted yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ServiceRequestDetailsIsland() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId");

  const {
    data: response,
    isPending,
    isError,
  } = useGetServiceRequestDetails(requestId!);

  if (!requestId) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-sm text-muted-foreground">
            No request ID was provided.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isPending) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-sm text-muted-foreground">
            Loading request details...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isError || !response?.data) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="font-medium">Unable to load request details.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return <RequestDetails request={response.data} />;
}
