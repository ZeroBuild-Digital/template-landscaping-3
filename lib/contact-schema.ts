import { z } from "zod";

/**
 * Canonical contact form schema for Zero Build Digital client sites.
 *
 * The `message` field is OPTIONAL by default. If this client's __SITE.md__
 * mandates a description, replace `.optional()` with `.min(5)` below.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().toLowerCase().email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(2000, "Message is too long")
    .optional()
    .or(z.literal("")),
  // Honeypot — must be empty. Bots fill hidden fields.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
