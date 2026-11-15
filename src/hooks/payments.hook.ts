import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllPayments, getMyPayments, getPaymentDetails } from "@/api";

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
