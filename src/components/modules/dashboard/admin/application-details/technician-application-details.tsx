"use client";

import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { useGetTechnicianDetails, useUpdateTechnicianStatus } from "@/hooks";
import type { TechnicianApplicationStatus } from "@/types";
import ApplicationDetailsSkeleton from "./application-details-skeleton";
import ApplicationDetailsView from "./application-details-view";

export default function TechnicainApplicationDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const technicianProfileId = searchParams.get("technicianId");

  const { data, isLoading, isError, error } = useGetTechnicianDetails(
    technicianProfileId ?? "",
  );

  const application = data?.data;

  const { mutate: changeApplicationStatus, isPending: statusChanging } =
    useUpdateTechnicianStatus();

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
            render={<Link href="/admin/applications" />}
            nativeButton={false}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Applications
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleStatusChange = (
    changedStatus: TechnicianApplicationStatus,
    technicianId: string,
  ) => {
    changeApplicationStatus(
      { technicianId, decision: changedStatus },
      {
        onSuccess: (res) => {
          toast.add({
            title: `Application ${changedStatus}`,
            description: res?.message || "Operation done successfully.",
            type: "success",
          });

          queryClient.removeQueries({ queryKey: ["technician-applications"] });
          router.push("/admin/applications");
        },
        onError: (err) => {
          toast.add({
            title: "Operation Failed",
            description: err.message || "Something Went Wrong",
            type: "error",
          });
        },
      },
    );
  };

  return (
    <ApplicationDetailsView
      application={application}
      onStatusChange={handleStatusChange}
      statusChanging={statusChanging}
    />
  );
}
