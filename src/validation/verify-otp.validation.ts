import { z } from "zod";

export const verifyOtpZodSchema = z.object({
  otp: z
    .string()
    .length(6, "Enter the 6-digit code")
    .regex(/^\d+$/, "The code must contain digits only"),
});
