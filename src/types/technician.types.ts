export interface ApplyTechnicianData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  bio: string;
  yearsOfExperience: number;
  serviceArea: string;
  categoryIds: string[];
}

export interface ApplyTechnicianPayload {
  license: File;
  data: ApplyTechnicianData;
}

export type TechnicianApplicationStatus = "REJECTED" | "APPROVED";

export type Technician = {
  /** Technician profile id. Used for the availability lookup. */
  id: string;
  /** User id. Sent as `technicianId` when assigning a request. */
  userId: string;
  name: string;
  serviceArea: string | null;
  yearsOfExperience: number | null;
};

export type GetTechniciansParams = {
  categoryId?: string;
  status?: "PENDING" | "APPROVED" | "REJECTED";
  searchTerm?: string;
};

export interface GetMyAssignedServiceRequestQueryParams {
  page?: number;
  limit?: number;
  sortBy?: "status" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  status?:
    | "PENDING"
    | "REVIEWED"
    | "ASSIGNED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "INVOICED"
    | "PAID"
    | "CLOSED"
    | "CANCELLED"
    | undefined;
}

export interface TechnicianSkill {
  id: string;
  technicianProfileId: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    description: string;
  };
}
