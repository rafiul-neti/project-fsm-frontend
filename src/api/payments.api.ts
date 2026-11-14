import apiClient from "@/lib/apiClient";
import type { ApiResponse, Payment, PaymentDetails } from "@/types";

export function getAllPayments(queryParams: { page?: number; limit?: number }) {
  return apiClient<ApiResponse<Payment[]>>("/payments", {
    query: queryParams,
  });
}

export function getPaymentDetails(paymentId: string) {
  return apiClient<ApiResponse<PaymentDetails>>(`/payments/${paymentId}`);
}
