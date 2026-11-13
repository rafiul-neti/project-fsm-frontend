import { ArrowLeft, ClipboardList } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ApplicationDetailsSkeleton from "@/components/modules/dashboard/admin/application-details/application-details-skeleton";
import TechnicainApplicationDetails from "@/components/modules/dashboard/admin/application-details/technician-application-details";
import { Button } from "@/components/ui/button";

export default function TechnicianApplicationDetailsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Static page heading */}
      <div className="space-y-3">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3"
          render={<Link href="/admin/technician-applications" />}
          nativeButton={false}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Applications
        </Button>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <ClipboardList className="size-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Application Details
            </h1>
            <p className="text-sm text-muted-foreground">
              Review the applicant's information and submitted documents.
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic island */}
      <Suspense fallback={<ApplicationDetailsSkeleton />}>
        <TechnicainApplicationDetails />
      </Suspense>
    </div>
  );
}
