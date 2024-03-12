import * as z from "zod";
import { Role, Status } from "@prisma/client";

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const RoleSchema = z.nativeEnum(Role);

export type RoleType = `${z.infer<typeof RoleSchema>}`;

export const StatusSchema = z.nativeEnum(Status);

export type StatusType = `${z.infer<typeof StatusSchema>}`;

/////////////////////////////////////////
// SCHEMAS
/////////////////////////////////////////

/////////////////////////////////////////
// Auth
/////////////////////////////////////////

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
  hospitalId: z.number().int().min(1, "Hospital ID is required").optional(),
});

/////////////////////////////////////////
// UI Components
/////////////////////////////////////////

export const NavigationSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.string(),
});
