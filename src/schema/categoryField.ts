import z from "zod";

export const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .transform((val) => val.trim())
    .refine((val) => val.length > 0, {
      message: "space not allow",
    }),
});

export type CategoryField = z.infer<typeof schema>;
