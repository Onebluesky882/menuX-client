import z from "zod";
export const newShopSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .transform((vel) => vel.trim()),
  address: z.string().min(1, "Address is required").optional(),
});

export type NewShopFormField = z.infer<typeof newShopSchema>;
