import { z } from "zod";

export const createServiceRequestSchema = z.object({
  categoryId: z.string().min(1, "Select a service category"),
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title is too long"),
  description: z
    .string()
    .min(20, "Please describe the problem in at least 20 characters")
    .max(1000),
  address: z.string().min(10, "Enter the full address"),
});
