import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllPayments,
  getMyPayments,
  getPaymentDetails,
  initiatePayment,
} from "@/api";

export function useInitiatePayment() {
  return useMutation({
    mutationFn: initiatePayment,
  });
}

export function useGetAllPayments(queryParams: {
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["all-payments-admin"],
    queryFn: () => getAllPayments(queryParams),
  });
}

export function useGetPaymentDetails(paymentId: string) {
  return useQuery({
    queryKey: ["payment-details", paymentId],
    queryFn: () => getPaymentDetails(paymentId),
  });
}

export function useGetMyPayments() {
  return useQuery({
    queryKey: ["my-payments"],
    queryFn: getMyPayments,
    placeholderData: keepPreviousData,
  });
}
