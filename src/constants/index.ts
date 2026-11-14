export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_IN_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const MAX_BIO_LENGTH = 1000;

export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

export const ACCEPTED_DOCS = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function isAcceptedFileSize(fileSize: number) {
  return fileSize <= MAX_FILE_SIZE_IN_BYTES;
}

export function isAcceptedFileType(fileType: string, fileIs?: "doc" | "img") {
  if (fileIs === "doc") {
    return ACCEPTED_DOCS.includes(fileType);
  }
  return ACCEPTED_FILE_TYPES.includes(fileType);
}

/* Demo Login */
export const DEMO_ACCOUNTS = [
  {
    role: "ADMIN",
    label: "Admin",
    description: "Manage requests, users and technician applications",
    email: "admin@fsm.com",
    password: "Admin123!",
    redirectTo: "/admin",
  },
  {
    role: "CUSTOMER",
    label: "Customer",
    description: "Book services and track your requests",
    email: "demo.customer@fsm.com",
    password: "REPLACE_WITH_DEMO_PASSWORD",
    redirectTo: "/customer",
  },
  {
    role: "TECHNICIAN",
    label: "Technician",
    description: "Manage assigned jobs and availability",
    email: "demo.technician@fsm.com",
    password: "REPLACE_WITH_DEMO_PASSWORD",
    redirectTo: "/technician",
  },
] as const;
