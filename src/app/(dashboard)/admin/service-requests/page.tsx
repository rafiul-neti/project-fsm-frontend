import { ClipboardList } from "lucide-react";
import AdminServiceRequests from "@/components/modules/dashboard/admin/admin-service-requests";

export default function AdminServiceRequestsPage() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-3">
          <ClipboardList className="size-6 text-primary" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Service Requests
          </h1>
          <p className="text-sm text-muted-foreground">
            Track every request from review to payment.
          </p>
        </div>
      </div>

      <AdminServiceRequests />
    </div>
  );
}
