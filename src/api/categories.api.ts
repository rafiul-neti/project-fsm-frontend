import apiClient from "@/lib/apiClient";
import type { ApiResponse, Category, CreateCategoryPayload } from "@/types";

export function getAllCategories() {
  return apiClient<ApiResponse<Category[]>>("/categories");
}

export function createCategory(payload: CreateCategoryPayload) {
  return apiClient("/categories", {
    method: "POST",
    body: payload,
  });
}
