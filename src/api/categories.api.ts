import apiClient from "@/lib/apiClient";
import type { ApiResponse, Category } from "@/types";

export function getAllCategories() {
  return apiClient<ApiResponse<Category[]>>("/categories");
}
