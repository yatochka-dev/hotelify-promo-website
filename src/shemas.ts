import z from "zod/v4";

export const waitlistEntry = z.object({
  name: z.string().min(1, "Name is required").max(300, "Name is too long"),
  email: z.email({ error: "Please enter a valid email" }),
  type: z.enum(["Consumer", "Business"]).default("Business"),
});

export type WaitlistEntry = z.infer<typeof waitlistEntry>;
