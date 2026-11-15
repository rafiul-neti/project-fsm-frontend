import CustomerServiceRequests from "@/components/modules/dashboard/customer/customer-service-requests";

export default function CustomerRequestsPage() {
  return (
    <main className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Service Requests
          </h1>

          <p className="text-sm text-muted-foreground">
            View and track the service requests you have submitted.
          </p>
        </div>

        <CustomerServiceRequests />
      </div>
    </main>
  );
}
