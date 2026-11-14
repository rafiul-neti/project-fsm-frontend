export const CURRENCY = "BDT";

export const formatMoney = (amount: number) =>
  `${CURRENCY} ${amount.toLocaleString("en-US")}`;

export const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));

export const formatGateway = (gateway: string) =>
  gateway.toUpperCase() === "BKASH" ? "bKash" : gateway;

export const formatStatus = (status: string) =>
  status.replaceAll("_", " ").toLowerCase();

// Covers payment words and service request statuses. Anything else is gray.
export const getStatusStyle = (status: string) => {
  switch (status.toUpperCase()) {
    case "PAID":
    case "SUCCESS":
    case "SUCCEEDED":
      return { dot: "bg-green-600", border: "border-green-600" };
    case "PENDING":
    case "INITIATED":
    case "PROCESSING":
      return { dot: "bg-amber-500", border: "border-amber-500" };
    case "REVIEWED":
      return { dot: "bg-sky-500", border: "border-sky-500" };
    case "ASSIGNED":
      return { dot: "bg-blue-500", border: "border-blue-500" };
    case "IN_PROGRESS":
      return { dot: "bg-violet-500", border: "border-violet-500" };
    case "COMPLETED":
      return { dot: "bg-teal-500", border: "border-teal-500" };
    case "INVOICED":
      return { dot: "bg-orange-500", border: "border-orange-500" };
    case "FAILED":
    case "CANCELLED":
    case "EXPIRED":
      return { dot: "bg-red-500", border: "border-red-500" };
    default:
      return { dot: "bg-slate-400", border: "border-slate-400" };
  }
};