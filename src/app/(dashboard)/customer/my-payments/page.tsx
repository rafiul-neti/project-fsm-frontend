import CustomerPayments from "@/components/modules/dashboard/customer/customer-payments";

export default function CustomerPaymentsPage() {
  return (
    <main className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Payments
          </h1>

          <p className="text-sm text-muted-foreground">
            View your payment history and transaction details.
          </p>
        </div>

        <CustomerPayments />
      </div>
    </main>
  );
}
