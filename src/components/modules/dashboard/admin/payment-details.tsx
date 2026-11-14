"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetPaymentDetails } from "@/hooks";
import PaymentDetailsSkeleton from "./payment-details-skeleton";
import PaymentDetailsView from "./payment-details-view";

const PAYMENTS_HREF = "/admin/payments";

function MessageCard({ title, message }: { title: string; message: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
        <AlertCircle className="size-10 text-destructive" />
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{message}</p>
        <Button
          variant="outline"
          render={<Link href={PAYMENTS_HREF} />}
          nativeButton={false}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Payments
        </Button>
      </CardContent>
    </Card>
  );
}

export default function PaymentDetailsContainer() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");

  const { data, isLoading, isError, error } = useGetPaymentDetails(
    paymentId ?? "",
  );

  const payment = data?.data;

  if (!paymentId) {
    return (
      <MessageCard
        title="Payment ID is missing"
        message="Please select a payment from the payments page."
      />
    );
  }

  if (isLoading) return <PaymentDetailsSkeleton />;

  if (isError || !payment) {
    return (
      <MessageCard
        title="Unable to load payment"
        message={
          error instanceof Error
            ? error.message
            : "Something went wrong while retrieving the payment."
        }
      />
    );
  }

  return <PaymentDetailsView payment={payment} />;
}
