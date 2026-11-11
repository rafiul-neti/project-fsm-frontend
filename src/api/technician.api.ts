import apiClient from "@/lib/apiClient";
import type { ApplyTechnicianPayload } from "@/types";

export function applyAsTechnician(payload: ApplyTechnicianPayload) {
  const formData = new FormData();

  formData.append("license", payload.license);
  formData.append("data", JSON.stringify(payload.data));

  return apiClient("/technicians/apply", {
    method: "POST",
    body: formData,
  });
}
