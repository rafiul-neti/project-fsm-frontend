type ServiceRequestStatus =
  | "PENDING"
  | "PAID"
  | "REVIEWED"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "INVOICED"
  | "CLOSED"
  | "CANCELLED";

export interface PaymentCustomer {
  id: string;
  name: string;
  email: string;
}

export interface PaymentTechnician {
  id: string;
  name: string;
  email: string;
}

export interface PaymentCategory {
  id: string;
  name: string;
}

export interface PaymentService {
  id: string;
  title: string;
  customer: PaymentCustomer;
  technician: PaymentTechnician | null;
  category: PaymentCategory;
}

export interface Payment {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  serviceId: string;
  refundReason: string | null;
  amount: number | null;
  paymentGateway: string;
  merchantInvoiceNumber: string | null;
  bkashPaymentId: string | null;
  bkashTrxId: string | null;
  payerReference: string | null;
  paidAt: string | null;
  gatewayResponse: Record<string, unknown> | null;
  refundTrxId: string | null;
  refundedAmount: number | null;
  refundedAt: string | null;
  service: PaymentService;
}

export interface PaymentDetails extends Payment {
  address: string;
  status: ServiceRequestStatus;
  customerId: string;
  technicianId: string;
}
