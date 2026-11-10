import { z } from "zod";

export const contactZodSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.email("Enter a valid email address"),
  topic: z.string().min(3, "Tell us what this is about"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
