import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/api";

export function useGetAllCategories() {
  return useQuery({
    queryKey: ["all-categories"],
    queryFn: getAllCategories,
  });
}
