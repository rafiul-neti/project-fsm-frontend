export type AuditAction =
  | "STATUS_CHANGE"
  | "ROLE_CHANGE"
  | "ASSIGNMENT"
  | "PAYMENT_UPDATE"
  | "ACCOUNT_ACTION";

export type TAuditActor = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TECHNICIAN" | "CUSTOMER";
};

export type TAuditLog = {
  id: string;
  actorId: string;
  actor: TAuditActor;
  action: AuditAction;
  entityType: string;
  entityId: string;
  serviceRequestId: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
};

export type TGetAllAuditLogsQuery = {
  action?: string;
  entityType?: string;
  actorId?: string;
  serviceRequestId?: string;
  page: number;
  limit: number;
  sortOrder: "asc" | "desc";
};
