import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(25)
    .regex(/^[+0-9() .-]+$/, "Please enter a valid phone number.")
    .refine((value) => {
      const digits = value.replace(/\D/g, "").length;
      return digits >= 7 && digits <= 15;
    }, "Please enter a phone number with 7–15 digits."),
  email: z
    .union([z.literal(""), z.string().trim().email("Please enter a valid email address.").max(254)])
    .optional()
    .transform((value) => value || null),
  service: z.string().trim().min(1, "Please select a service.").max(100),
  brand: z.string().trim().max(100, "Brand must be 100 characters or fewer.").optional().transform(value => value || null),
  timeline: z.enum([
    "Flexible",
    "As soon as possible",
    "Today if available",
    "Within a week",
    "Schedule a visit",
    "Within a month",
    "In 1–3 months",
    "Just exploring",
  ]),
  description: z
    .string()
    .trim()
    .max(1500)
    .transform((value) => value || null),
  source: z.string().trim().max(250).refine(value => value.startsWith("/") && !value.startsWith("//") && !value.includes("?") && !value.includes("#"), "Please use a valid enquiry page."),
});
