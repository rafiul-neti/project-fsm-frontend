export interface AdminDashboardStats {
  serviceRequestsByStatus: Record<
    | "PENDING"
    | "REVIEWED"
    | "ASSIGNED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "INVOICED"
    | "PAID"
    | "CLOSED"
    | "CANCELLED",
    number
  >;
  totalRevenue: number;
  techniciansByApplicationStatus: Record<
    "PENDING" | "APPROVED" | "REJECTED",
    number
  >;
}
