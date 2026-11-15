import {
  Banknote,
  CalendarDays,
  CreditCard,
  Hash,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Star,
  Tag,
  User,
  UserCog,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ElementType, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ServiceRequestDetails, UploadedFile } from "@/types";
import {
  formatDateTime,
  formatGateway,
  formatMoney,
  formatStatus,
  getStatusStyle,
} from "@/utils";
import AssignTechnicianDialog from "./assign-technician-dialog";

const NOT_AVAILABLE = "Not available";

const paymentDetailsHref = (paymentId: string) =>
  `/payment/details?paymentId=${paymentId}`;

const toMoney = (value: string | number | null) =>
  value === null ? null : formatMoney(Number(value));

function DetailItem({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: ElementType;
  label: string;
  value: string | null | undefined;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-muted p-2">
        <Icon className="size-4 text-muted-foreground" />
      </div>

      <div className="min-w-0 space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p
          className={cn(
            "wrap-break-word text-sm font-medium",
            mono && "break-all font-mono text-xs",
          )}
        >
          {value || NOT_AVAILABLE}
        </p>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  description,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  description: string;
  icon: ElementType;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="size-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function ImageGrid({ files, label }: { files: UploadedFile[]; label: string }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {files.map((file, index) => (
        <li key={file.publicId}>
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block aspect-4/3 overflow-hidden rounded-lg border bg-muted"
          >
            <Image
              src={file.url}
              alt={`${label} ${index + 1}`}
              fill
              unoptimized
              sizes="(min-width: 640px) 200px, 50vw"
              className="object-cover"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

type StepState = "done" | "current" | "todo" | "cancelled";

type Step = {
  label: string;
  detail?: string | null;
  state: StepState;
};

function buildSteps(request: ServiceRequestDetails): Step[] {
  const base = [
    {
      label: "Request created",
      detail: formatDateTime(request.createdAt),
      done: true,
    },
    {
      label: "Technician assigned",
      detail: request.technician
        ? `${request.technician.name}${
            request.assignedBy ? `, by ${request.assignedBy.name}` : ""
          }`
        : null,
      done: Boolean(request.technician),
    },
    {
      label: "Work started",
      detail: request.startedAt ? formatDateTime(request.startedAt) : null,
      done: Boolean(request.startedAt),
    },
    {
      label: "Work completed",
      detail: request.completedAt ? formatDateTime(request.completedAt) : null,
      done: Boolean(request.completedAt),
    },
    {
      label: "Payment received",
      detail: request.payment?.paidAt
        ? formatDateTime(request.payment.paidAt)
        : null,
      done: Boolean(request.payment?.paidAt),
    },
  ];

  if (request.cancelledAt) {
    return [
      ...base
        .filter((step) => step.done)
        .map((step): Step => ({ ...step, state: "done" })),
      {
        label: "Request cancelled",
        detail: formatDateTime(request.cancelledAt),
        state: "cancelled",
      },
    ];
  }

  const firstPending = base.findIndex((step) => !step.done);

  return base.map(
    (step, index): Step => ({
      label: step.label,
      detail: step.detail,
      state: step.done ? "done" : index === firstPending ? "current" : "todo",
    }),
  );
}

function ProgressTimeline({ steps }: { steps: Step[] }) {
  return (
    <ol>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <li key={step.label} className="relative flex gap-3.5 pb-5 last:pb-0">
            {!isLast && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-1.75 top-4 bottom-0 w-0.5",
                  step.state === "done" ? "bg-primary" : "bg-border",
                )}
              />
            )}
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 mt-0.5 size-4 shrink-0 rounded-full",
                step.state === "done" && "bg-primary",
                step.state === "current" && "border-4 border-primary bg-card",
                step.state === "todo" && "bg-muted",
                step.state === "cancelled" && "bg-red-500",
              )}
            />
            <div className="flex flex-col">
              <span
                className={cn(
                  "text-sm font-medium leading-5",
                  step.state === "todo" && "text-muted-foreground",
                  step.state === "cancelled" && "text-red-600",
                )}
              >
                {step.label}
              </span>
              {step.detail && (
                <span className="text-sm text-muted-foreground">
                  {step.detail}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function ServiceRequestDetailsView({
  request,
}: {
  request: ServiceRequestDetails;
}) {
  const statusStyle = getStatusStyle(request.status);
  const steps = buildSteps(request);

  const hasCompletionInfo = Boolean(
    request.completedAt ||
      request.completionNotes ||
      request.finalAmount !== null ||
      request.completionPhotoUrls?.length,
  );

  return (
    <div className="space-y-6">
      {/* ---------- Summary ---------- */}
      <Card>
        <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 space-y-1">
            <h2 className="font-heading text-2xl font-bold tracking-tight">
              {request.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {request.category.name} · Created{" "}
              {formatDateTime(request.createdAt)}
            </p>
            <p className="break-all font-mono text-xs text-muted-foreground">
              {request.id}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <span
              className={cn(
                "inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium capitalize",
                statusStyle.border,
              )}
            >
              <span className={cn("size-2 rounded-full", statusStyle.dot)} />
              {formatStatus(request.status)}
            </span>
            {request.finalAmount !== null && (
              <p className="font-heading text-xl font-bold">
                {toMoney(request.finalAmount)}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ---------- Progress ---------- */}
        <SectionCard
          title="Progress"
          description="How this request moved from creation to payment."
          icon={CalendarDays}
        >
          <ProgressTimeline steps={steps} />
        </SectionCard>

        {/* ---------- Request ---------- */}
        <SectionCard
          title="Request"
          description="What the customer asked for."
          icon={Wrench}
        >
          <div className="space-y-5">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="whitespace-pre-wrap text-sm leading-7">
                {request.description}
              </p>
            </div>

            <DetailItem icon={MapPin} label="Address" value={request.address} />
            <DetailItem
              icon={Tag}
              label="Category"
              value={request.category.name}
            />

            {request.attachmentUrls && request.attachmentUrls.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Attachments</p>
                <ImageGrid files={request.attachmentUrls} label="Attachment" />
              </div>
            )}
          </div>
        </SectionCard>

        {/* ---------- Customer ---------- */}
        <SectionCard
          title="Customer"
          description="The person who made the request."
          icon={User}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <DetailItem
              icon={User}
              label="Name"
              value={request.customer.name}
            />
            <DetailItem
              icon={Mail}
              label="Email"
              value={request.customer.email}
            />
            <DetailItem
              icon={Phone}
              label="Contact number"
              value={request.customer.contactNumber}
            />
            <DetailItem
              icon={Hash}
              label="Customer ID"
              value={request.customer.id}
              mono
            />
          </div>
        </SectionCard>

        {/* ---------- Technician ---------- */}
        <SectionCard
          title="Technician"
          description="The technician assigned to the job."
          icon={Wrench}
        >
          {request.technician ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <DetailItem
                icon={User}
                label="Name"
                value={request.technician.name}
              />
              <DetailItem
                icon={Mail}
                label="Email"
                value={request.technician.email}
              />
              <DetailItem
                icon={Phone}
                label="Contact number"
                value={request.technician.contactNumber}
              />
              <DetailItem
                icon={UserCog}
                label="Assigned by"
                value={request.assignedBy?.name}
              />
              <DetailItem
                icon={Hash}
                label="Technician ID"
                value={request.technician.id}
                mono
              />
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <p className="text-sm text-muted-foreground">
                No technician is assigned to this request yet.
              </p>

              <AssignTechnicianDialog
                categoryId={request.categoryId}
                categoryName={request.category.name}
                serviceRequestId={request.id}
              />
            </div>
          )}
        </SectionCard>

        {/* ---------- Completion ---------- */}
        {hasCompletionInfo && (
          <SectionCard
            title="Completion"
            description="What the technician reported after the work."
            icon={Wrench}
          >
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <DetailItem
                  icon={Banknote}
                  label="Final amount"
                  value={toMoney(request.finalAmount)}
                />
                <DetailItem
                  icon={CalendarDays}
                  label="Completed on"
                  value={
                    request.completedAt
                      ? formatDateTime(request.completedAt)
                      : null
                  }
                />
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="whitespace-pre-wrap text-sm leading-7">
                  {request.completionNotes || "No notes were added."}
                </p>
              </div>

              {request.completionPhotoUrls &&
                request.completionPhotoUrls.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Completion photos
                    </p>
                    <ImageGrid
                      files={request.completionPhotoUrls}
                      label="Completion photo"
                    />
                  </div>
                )}
            </div>
          </SectionCard>
        )}

        {/* ---------- Cancellation ---------- */}
        {request.cancelledAt && (
          <SectionCard
            title="Cancellation"
            description="Why this request was cancelled."
            icon={CalendarDays}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <DetailItem
                icon={CalendarDays}
                label="Cancelled on"
                value={formatDateTime(request.cancelledAt)}
              />
              <DetailItem
                icon={MessageSquare}
                label="Reason"
                value={request.cancellationReason}
              />
            </div>
          </SectionCard>
        )}

        {/* ---------- Payment ---------- */}
        <SectionCard
          title="Payment"
          description="The payment linked to this request."
          icon={CreditCard}
        >
          {request.payment ? (
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <DetailItem
                  icon={Banknote}
                  label="Amount"
                  value={toMoney(request.payment.amount)}
                />
                <DetailItem
                  icon={CreditCard}
                  label="Gateway"
                  value={formatGateway(request.payment.paymentGateway)}
                />
                <DetailItem
                  icon={Tag}
                  label="Status"
                  value={formatStatus(request.payment.status)}
                />
                <DetailItem
                  icon={CalendarDays}
                  label="Paid on"
                  value={
                    request.payment.paidAt
                      ? formatDateTime(request.payment.paidAt)
                      : null
                  }
                />
                <DetailItem
                  icon={Hash}
                  label="bKash transaction ID"
                  value={request.payment.bkashTrxId}
                  mono
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                render={<Link href={paymentDetailsHref(request.payment.id)} />}
                nativeButton={false}
              >
                View payment details
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No payment has been made for this request yet.
            </p>
          )}
        </SectionCard>

        {/* ---------- Feedback ---------- */}
        <SectionCard
          title="Customer feedback"
          description="The review left after the job."
          icon={Star}
        >
          {request.feedback ? (
            <div className="space-y-3">
              <div
                role="img"
                aria-label={`${request.feedback.rating} out of 5 stars`}
                className="flex gap-0.5"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={`service-request-details-view`
                      .split("")
                      .join(`${index}`)}
                    size={20}
                    aria-hidden="true"
                    className={cn(
                      index < request.feedback!.rating
                        ? "fill-amber-500 text-amber-500"
                        : "text-border",
                    )}
                  />
                ))}
              </div>
              <p className="whitespace-pre-wrap text-sm leading-7">
                {request.feedback.comment || "No comment was written."}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDateTime(request.feedback.createdAt)}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              The customer has not left feedback yet.
            </p>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
