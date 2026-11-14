import {
  Banknote,
  CalendarDays,
  CreditCard,
  Hash,
  Mail,
  MapPin,
  Receipt,
  RotateCcw,
  Tag,
  User,
  Wrench,
} from "lucide-react";
import type { ElementType } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PaymentDetails } from "@/types";
import {
  formatDateTime,
  formatGateway,
  formatMoney,
  formatStatus,
  getStatusStyle,
} from "@/utils";

const NOT_AVAILABLE = "Not available";

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
            "break-all text-sm font-medium",
            mono && "font-mono text-xs",
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
}: {
  title: string;
  description: string;
  icon: ElementType;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="size-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 sm:grid-cols-2">
        {children}
      </CardContent>
    </Card>
  );
}

export default function PaymentDetailsView({
  payment,
}: {
  payment: PaymentDetails;
}) {
  const { service } = payment;
  const statusStyle = getStatusStyle(payment.status);

  const hasRefund = Boolean(
    payment.refundedAt ||
      payment.refundedAmount !== null ||
      payment.refundTrxId ||
      payment.refundReason,
  );

  return (
    <div className="space-y-6">
      {/* ---------- Summary ---------- */}
      <Card>
        <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="font-heading text-3xl font-bold tracking-tight">
              {payment.amount !== null
                ? formatMoney(payment.amount)
                : NOT_AVAILABLE}
            </p>
            <p className="text-sm text-muted-foreground">
              {service.title} · {service.category.name}
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
              {formatStatus(payment.status)}
            </span>
            <p className="font-mono text-xs text-muted-foreground">
              {payment.merchantInvoiceNumber ?? payment.id}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ---------- Payment ---------- */}
        <SectionCard
          title="Payment"
          description="When and how this payment was made."
          icon={Banknote}
        >
          <DetailItem icon={Hash} label="Payment ID" value={payment.id} mono />
          <DetailItem
            icon={CreditCard}
            label="Gateway"
            value={formatGateway(payment.paymentGateway)}
          />
          <DetailItem
            icon={CalendarDays}
            label="Created"
            value={formatDateTime(payment.createdAt)}
          />
          <DetailItem
            icon={CalendarDays}
            label="Paid on"
            value={payment.paidAt ? formatDateTime(payment.paidAt) : null}
          />
          <DetailItem
            icon={CalendarDays}
            label="Last updated"
            value={formatDateTime(payment.updatedAt)}
          />
        </SectionCard>

        {/* ---------- bKash ---------- */}
        <SectionCard
          title="bKash transaction"
          description="References from the payment gateway."
          icon={Receipt}
        >
          <DetailItem
            icon={Hash}
            label="bKash payment ID"
            value={payment.bkashPaymentId}
            mono
          />
          <DetailItem
            icon={Hash}
            label="bKash transaction ID"
            value={payment.bkashTrxId}
            mono
          />
          <DetailItem
            icon={Receipt}
            label="Merchant invoice number"
            value={payment.merchantInvoiceNumber}
            mono
          />
          <DetailItem
            icon={User}
            label="Payer reference"
            value={payment.payerReference}
          />
        </SectionCard>

        {/* ---------- Refund (only when there is one) ---------- */}
        {hasRefund && (
          <SectionCard
            title="Refund"
            description="Details of the refund for this payment."
            icon={RotateCcw}
          >
            <DetailItem
              icon={Banknote}
              label="Refunded amount"
              value={
                payment.refundedAmount !== null
                  ? formatMoney(payment.refundedAmount)
                  : null
              }
            />
            <DetailItem
              icon={CalendarDays}
              label="Refunded on"
              value={
                payment.refundedAt ? formatDateTime(payment.refundedAt) : null
              }
            />
            <DetailItem
              icon={Hash}
              label="Refund transaction ID"
              value={payment.refundTrxId}
              mono
            />
            <DetailItem
              icon={RotateCcw}
              label="Reason"
              value={payment.refundReason}
            />
          </SectionCard>
        )}

        {/* ---------- Service request ---------- */}
        <SectionCard
          title="Service request"
          description="The job this payment belongs to."
          icon={Wrench}
        >
          <DetailItem icon={Wrench} label="Title" value={service.title} />
          <DetailItem
            icon={Tag}
            label="Category"
            value={service.category.name}
          />
          <DetailItem icon={MapPin} label="Address" value={payment.address} />
          <DetailItem
            icon={Hash}
            label="Service request ID"
            value={payment.serviceId}
            mono
          />
        </SectionCard>

        {/* ---------- Customer ---------- */}
        <SectionCard
          title="Customer"
          description="The person who paid."
          icon={User}
        >
          <DetailItem icon={User} label="Name" value={service.customer.name} />
          <DetailItem
            icon={Mail}
            label="Email"
            value={service.customer.email}
          />
          <DetailItem
            icon={Hash}
            label="Customer ID"
            value={payment.customerId}
            mono
          />
        </SectionCard>

        {/* ---------- Technician ---------- */}
        <SectionCard
          title="Technician"
          description="The technician assigned to the job."
          icon={Wrench}
        >
          {service.technician ? (
            <>
              <DetailItem
                icon={User}
                label="Name"
                value={service.technician.name}
              />
              <DetailItem
                icon={Mail}
                label="Email"
                value={service.technician.email}
              />
              <DetailItem
                icon={Hash}
                label="Technician ID"
                value={payment.technicianId}
                mono
              />
            </>
          ) : (
            <p className="text-sm text-muted-foreground sm:col-span-2">
              No technician is assigned to this request.
            </p>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
