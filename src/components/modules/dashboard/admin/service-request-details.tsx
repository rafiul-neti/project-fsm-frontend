"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetServiceRequestDetails } from "@/hooks";
import ServiceRequestDetailsSkeleton from "./service-request-details-skeleton";
import ServiceRequestDetailsView from "./service-request-details-view";

const SERVICE_REQUESTS_HREF = "/admin/service-requests";

function MessageCard({ title, message }: { title: string; message: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
        <AlertCircle className="size-10 text-destructive" />
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{message}</p>
        <Button
          variant="outline"
          render={<Link href={SERVICE_REQUESTS_HREF} />}
          nativeButton={false}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Service Requests
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ServiceRequestDetailsContainer() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId");

  const { data, isLoading, isError, error } = useGetServiceRequestDetails(
    requestId ?? "",
  );

  // The request is inside the `data` field of the API response.
  const request = data?.data;

  if (!requestId) {
    return (
      <MessageCard
        title="Request ID is missing"
        message="Please select a request from the service requests page."
      />
    );
  }

  if (isLoading) return <ServiceRequestDetailsSkeleton />;

  if (isError || !request) {
    return (
      <MessageCard
        title="Unable to load service request"
        message={
          error instanceof Error
            ? error.message
            : "Something went wrong while retrieving the service request."
        }
      />
    );
  }

  return <ServiceRequestDetailsView request={request} />;
}