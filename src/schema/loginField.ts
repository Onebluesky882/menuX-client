import z from "zod";
export const schema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .transform((val) => val.trim().toLowerCase()),
  password: z.string().transform((val) => val.trim()),
});

export type LoginField = z.infer<typeof schema>;
