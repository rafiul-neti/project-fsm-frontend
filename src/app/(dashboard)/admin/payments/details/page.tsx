import { ArrowLeft, Receipt } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import PaymentDetailsContainer from "@/components/modules/dashboard/admin/payments/payment-details";
import PaymentDetailsSkeleton from "@/components/modules/dashboard/admin/payments/payment-details-skeleton";
import { Button } from "@/components/ui/button";

export default function PaymentDetailsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="space-y-3">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3"
          render={<Link href="/admin/payments" />}
          nativeButton={false}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Payments
        </Button>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <Receipt className="size-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Payment Details
            </h1>
            <p className="text-sm text-muted-foreground">
              Review the full payment, gateway, and service information.
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<PaymentDetailsSkeleton />}>
        <PaymentDetailsContainer />
      </Suspense>
    </div>
  );
}