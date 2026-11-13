import type { UserRole } from "./user.types";

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

export interface User {
  id: string;
  name: string;
  email: string;
  authProvider: "GOOGLE" | "CREDENTIAL";
  role: UserRole;
  profileImage: string | null;
  contactNumber: string | null;
  isEmailVerified: boolean;
  isBlocked: boolean;
  createdAt: string;
}
