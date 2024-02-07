import * as z from "zod";
import { Role } from "@prisma/client";

// const userRole = ["ADMIN", "PHYSICIAN", "MEDICAL_ASSISTANT"] as const;

export const UserRoleSchema = z.nativeEnum(Role);

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
  name: z.string().min(1, "Name is required"),
  role: z.nativeEnum(Role, {
    errorMap: () => ({ message: "Invalid role" }),
  }),
});
