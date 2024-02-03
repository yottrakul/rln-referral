import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
  name: z.string().min(1, "Name is required"),
  role: z.enum(["ADMIN", "PHYSICIAN", "MEDICAL_ASSISTANT"], {
    errorMap: () => ({ message: "Invalid role" }),
  }),
});
