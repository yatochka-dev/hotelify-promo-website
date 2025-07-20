import z from "zod/v4";

export const waitlistEntry= z.object({
    name: z.string().min(1).max(300),
    email: z.email(),
    type: z.enum(["Consumer", "Business"]).default("Business")
})


export type WaitlistEntry = z.infer<typeof waitlistEntry>