import { z } from "zod";

export const applyAsTechnicianValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(20, {
      message: "Name must not exceed 20 characters.",
    }),
  email: z.email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, "Password Must at least 8 Characters Long.")
    .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
    .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")

    .regex(/[0-9]/, "Password must contain atleast 1 Number")
    .regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),
  phoneNumber: z
    .string()
    .trim()
    .regex(
      /^(?:\+?880|0)1[3-9]\d{8}$/,
      "Please provide a valid Bangladeshi number",
    ),
  bio: z
    .string()
    .trim()
    .min(20, {
      message:
        "Bio must be at least 20 characters — tell us about your experience.",
    })
    .max(1000, { message: "Bio must not exceed 1000 characters." }),
  yearsOfExperience: z
    .number()
    .int({ message: "Years of experience must be a whole number." })
    .min(0, { message: "Years of experience cannot be negative." })
    .max(50, {
      message:
        "Years of experience seems unrealistic — please check the value.",
    }),
  serviceArea: z
    .string()
    .trim()
    .min(2, { message: "Service area is required." })
    .max(100, { message: "Service area must not exceed 100 characters." }),
  categoryIds: z.uuid(),
  license: z
    .file()
    .nullable()
    .refine((file) => file !== undefined, {
      message: "Please upload your license.",
    }),
});
