import ServiceRequestDetailsIsland from "@/components/modules/dashboard/customer/service-request-details-island";

export default function RequestDetailsPage() {
  return (
    <div className="space-y-6 min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Request Details</h1>
        <p className="text-muted-foreground">
          View the details and progress of your service request.
        </p>
      </div>

      <ServiceRequestDetailsIsland />
    </div>
  );
}
