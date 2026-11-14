import { CreditCard } from "lucide-react";
import AdminPayments from "@/components/modules/dashboard/admin/admin-payments";

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-3">
          <CreditCard className="size-6 text-primary" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-sm text-muted-foreground">
            Review every payment made on the platform.
          </p>
        </div>
      </div>

      <AdminPayments />
    </div>
  );
}
