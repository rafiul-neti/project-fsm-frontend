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

export interface TechnicianApplication {
  address: string | null;
  authProvider: "CREDENTIAL" | "GOOGLE";
  contactNumber: string;
  createdAt: string;
  deletedAt: string | null;
  email: string;
  googleId: string | null;
  id: string;
  isBlocked: boolean;
  isDeleted: boolean;
  isEmailVerified: boolean;
  name: string;
  profileImage: string | null;
  role: "TECHNICIAN";
  updatedAt: string;
  technicianProfileId: string;
  bio: string;
  yearsOfExperience: number;
  serviceArea: string;
  licenseURL: string;
  availabilityStatus: string;
  applicationStatus: "PENDING";
}

export interface TechnicianApplicationDetails {
  id: string;
  userId: string;
  bio: string;
  yearsOfExperience: number;
  serviceArea: string;
  licenseURL: string | null;
  availabilityStatus: string;
  applicationStatus: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    profileImage: string | null;
    contactNumber: string;
    address: string | null;
    isEmailVerified: boolean;
    isBlocked: boolean;
  };
  skills: {
    category: {
      name: string;
    };
  }[];
}

