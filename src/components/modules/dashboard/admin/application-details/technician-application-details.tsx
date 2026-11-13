"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import ApplicationDetailsSkeleton from "./application-details-skeleton";
import ApplicationDetailsView from "./application-details-view";

// Import your actual API hooks.
// import {
//   useGetTechnicianApplicationDetails,
//   useApproveTechnicianApplication,
//   useRejectTechnicianApplication,
// } from "@/hooks";

export default function TechnicainApplicationDetails() {
  const searchParams = useSearchParams();

  const technicianProfileId = searchParams.get("technicianProfileId");

  // Connect your details API hook here.
  // Pass technicianProfileId to your hook.
  //
  // const { data, isLoading, isError, error } =
  //   useGetTechnicianApplicationDetails(technicianProfileId ?? "");

  // Connect your mutation hooks here.
  //
  // const { mutate: approveApplication, isPending: isApproving } =
  //   useApproveTechnicianApplication();
  //
  // const { mutate: rejectApplication, isPending: isRejecting } =
  //   useRejectTechnicianApplication();

  // Temporary placeholders: replace these with your hook results.
  const isLoading = false;
  const isError = false;
  const error: unknown = null;
  const application = undefined;

  if (!technicianProfileId) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <AlertCircle className="size-10 text-destructive" />

          <h2 className="text-lg font-semibold">Application ID is missing</h2>

          <p className="text-sm text-muted-foreground">
            Please select an application from the applications page.
          </p>

          <Button
            render={<Link href="/admin-dashboard/technician-applications" />}
            nativeButton={false}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Applications
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return <ApplicationDetailsSkeleton />;
  }

  if (isError || !application) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <AlertCircle className="size-10 text-destructive" />

          <h2 className="text-lg font-semibold">Unable to load application</h2>

          <p className="text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong while retrieving the application."}
          </p>

          <Button
            variant="outline"
            render={<Link href="/admin-dashboard/technician-applications" />}
            nativeButton={false}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Applications
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Connect your mutation handlers here.
  const handleApprove = () => {
    // approveApplication(application.id, {
    //   onSuccess: () => {
    //     // Invalidate the pending applications query.
    //     // Navigate back to the applications page.
    //   },
    // });
  };

  const handleReject = () => {
    // rejectApplication(application.id, {
    //   onSuccess: () => {
    //     // Invalidate the pending applications query.
    //     // Navigate back to the applications page.
    //   },
    // });
  };

  return (
    <ApplicationDetailsView
      application={application}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
}
