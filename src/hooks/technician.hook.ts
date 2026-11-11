import { useMutation } from "@tanstack/react-query";
import { applyAsTechnician } from "@/api";

export function useApplyAsTechnician() {
  return useMutation({
    mutationFn: applyAsTechnician,
  });
}
