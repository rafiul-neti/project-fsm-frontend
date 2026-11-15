export type ServiceRequestStatus =
  | "PENDING"
  | "PAID"
  | "REVIEWED"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "INVOICED"
  | "CLOSED"
  | "CANCELLED";

export interface ServiceRequestsQueryParams {
  status?: ServiceRequestStatus;
  categoryId?: string;
  technicianId?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ServiceRequestPerson {
  id: string;
  name: string;
  email: string;
}

export interface ServiceRequestCategory {
  id: string;
  name: string;
}

export interface UploadedFile {
  url: string;
  publicId: string;
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  categoryId: string;
  technicianId: string | null;
  assignedById: string | null;
  availabilityId: string | null;

  title: string;
  description: string;
  address: string;
  attachmentUrls: UploadedFile[] | null;

  status: ServiceRequestStatus;

  startedAt: string | null;
  completedAt: string | null;
  completionNotes: string | null;
  completionPhotoUrls: UploadedFile[] | null;
  finalAmount: string | null;

  cancelledAt: string | null;
  cancellationReason: string | null;

  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt: string | null;

  customer: ServiceRequestPerson;
  technician: ServiceRequestPerson | null;
  category: ServiceRequestCategory;
}

export interface ServiceRequestContact {
  id: string;
  name: string;
  email: string;
  contactNumber: string | null;
}

export interface ServiceRequestCategoryDetails {
  id: string;
  name: string;
  description: string;
}

export interface ServiceRequestPayment {
  id: string;
  status: string;
  amount: string | number | null;
  paymentGateway: string;
  bkashTrxId: string | null;
  paidAt: string | null;
  refundedAmount: string | number | null;
  refundedAt: string | null;
}

export interface ServiceRequestFeedback {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export interface ServiceRequestDetails
  extends Omit<ServiceRequest, "customer" | "technician" | "category"> {
  category: ServiceRequestCategoryDetails;
  customer: ServiceRequestContact;
  technician: ServiceRequestContact | null;
  assignedBy: { id: string; name: string } | null;
  payment: ServiceRequestPayment | null;
  feedback: ServiceRequestFeedback | null;
}
