import z from "zod";

export const schema = z
  .object({
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .transform((val) => val.trim().toLowerCase()),
    username: z.string().transform((val) => val.trim()),
    password: z.string().min(8, "password must be at least 8 characters"),
    // .regex(/[A-Z]/, "Must contain an uppercase letter"),
    confirmPassword: z.string(),
  })
  .refine((vals) => vals.password === vals.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export type SignupField = z.infer<typeof schema>;
