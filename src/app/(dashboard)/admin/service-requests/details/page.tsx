import { ArrowLeft, ClipboardList } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ServiceRequestDetailsContainer from "@/components/modules/dashboard/admin/service-request-details";
import ServiceRequestDetailsSkeleton from "@/components/modules/dashboard/admin/service-request-details-skeleton";
import { Button } from "@/components/ui/button";

export default function ServiceRequestDetailsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="space-y-3">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3"
          render={<Link href="/admin/service-requests" />}
          nativeButton={false}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Service Requests
        </Button>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <ClipboardList className="size-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Service Request Details
            </h1>
            <p className="text-sm text-muted-foreground">
              Review the request, its progress, payment, and feedback.
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<ServiceRequestDetailsSkeleton />}>
        <ServiceRequestDetailsContainer />
      </Suspense>
    </div>
  );
}
