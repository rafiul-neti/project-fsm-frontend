import { useMutation, useQuery } from "@tanstack/react-query";
import { createCategory, getAllCategories } from "@/api";

export function useGetAllCategories() {
  return useQuery({
    queryKey: ["all-categories"],
    queryFn: getAllCategories,
  });
}

export function useCreateCategory() {
  return useMutation({
    mutationFn: createCategory,
  });
}
