import { UserSchema } from "./generated/zod/index";
import * as z from "zod";
import { Role, Status } from "@prisma/client";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/app/_lib/definition";

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const RoleSchema = z.nativeEnum(Role);

export type RoleType = `${z.infer<typeof RoleSchema>}`;

export const StatusSchema = z.nativeEnum(Status);

export type StatusType = `${z.infer<typeof StatusSchema>}`;

/////////////////////////////////////////
// DEFINE FUNCTIONS
/////////////////////////////////////////

const passwordMatch = ({ password, confirmPassword }: { password?: string | null; confirmPassword?: string | null }) =>
  password === confirmPassword;

/////////////////////////////////////////
// RegExp FUNCTIONS
/////////////////////////////////////////

// Regex for password is at least 4 characters
export const passwordRegex = new RegExp(/^([a-zA-Z\d]|\s){4,}$/);

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
  hospitalId: z.coerce.number().int().min(1, "Hospital ID is required").optional(),
});

/////////////////////////////////////////
// UI Components
/////////////////////////////////////////

export const NavigationSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.string(),
});

/////////////////////////////////////////
// Users
/////////////////////////////////////////
// type UserSchemaType = z.infer<typeof UserSchema>;

export const UserSchemaWithOutPassword = UserSchema.omit({ password: true });
export const UpdateUserSchema = z.object({
  password: z.string().min(1, "Password is required").optional(),
  name: z.string().min(1, "Name is required"),
  role: z.nativeEnum(Role, {
    errorMap: () => ({ message: "Invalid role" }),
  }),
  hospitalId: z.coerce.number().int().min(1, "Hospital ID is required").optional(),
  image: z.string().url().optional(),
});

export const UserRegisterSchema = z.object({
  name: z.string().min(1, "Name is required").nullable(),
  prefixName: z.string().min(1, "Prefix name is required").nullable(),
  firstName: z.string().min(1, "First name is required").nullable(),
  lastName: z.string().min(1, "Last name is required").nullable(),
  email: z.string().email().nullable(),
  // image: z.string().url().optional().nullable(),
  image: z
    .custom<FileList>()
    .transform((files) => {
      // if (files.length === 0) return undefined;
      return files[0];
    })
    .refine((e) => {
      return e?.size ?? 0 <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((e) => {
      if (!e) return true;
      return ACCEPTED_IMAGE_TYPES.includes(e.type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported.")
    .optional(),
  password: z.coerce
    .string()
    .min(1, "Password is required")
    .regex(passwordRegex, { message: "Your password is not valid" })
    .nullable()
    .optional(),

  role: z.nativeEnum(Role, {
    errorMap: () => ({ message: "Invalid role" }),
  }),
  hospitalId: z.coerce.number().int().optional().nullable(),
});

// .refine(passwordMatch, {
//   message: "Password and confirm password do not match",
//   path: ["confirmPassword"],
// });

export const UserRegisterWithRefineSchema = UserRegisterSchema.merge(
  z.object({
    confirmPassword: z.string().min(1, "Confirm password is required").nullable().optional(),
  })
).refine(passwordMatch, {
  message: "Password and confirm password do not match",
  path: ["confirmPassword"],
});

// make UserRegisterSchema of password optional
export const UserUpdateSchema = UserRegisterSchema.merge(
  z.object({
    password: z
      .union([z.string().regex(passwordRegex, { message: "Your password is not valid" }), z.string().length(0)])
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    // password: z.coerce.string().regex(passwordRegex, { message: "Your password is not valid" }).optional(),
    confirmPassword: z.coerce
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
  })
).refine(passwordMatch, {
  message: "Password and confirm password do not match",
  path: ["confirmPassword"],
});

/////////////////////////////////////////
// Hospitals
/////////////////////////////////////////

export const HospitalSchema = z.object({
  id: z.coerce.number().int({ message: "Invalid hospital ID" }),
  hospitalName: z.string().min(1, "Hospital name is required"),
});
