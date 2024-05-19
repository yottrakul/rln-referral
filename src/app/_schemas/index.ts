import { UserSchema } from "./generated/zod/index";
import * as z from "zod";
import { Role, Status, Gender, BloodType } from "@prisma/client";
import { MAX_IMAGE_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/app/_lib/definition";
import { isValidThaiID } from "@/app/_lib";
import { type File } from "buffer";
import type { FileUpload, PreparedMedRecItem } from "@/app/_lib/definition";

/////////////////////////////////////////
// OMIT
/////////////////////////////////////////

type MedOmitID = Omit<PreparedMedRecItem, "id">;

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
export const phoneNumberRegex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g);
export const postalCodeRegex = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/g);

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

export const CreateUserSchema = UserSchema.omit({
  id: true,
  emailVerified: true,
}).merge(
  z.object({
    email: z.string().email(),
    password: z.string(),
  })
);

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
      return e?.size ?? 0 <= MAX_IMAGE_FILE_SIZE;
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
    prefixName: z.string().min(1, "Prefix name is required").nullable().optional(),
    firstName: z.string().min(1, "First name is required").nullable().optional(),
    lastName: z.string().min(1, "Last name is required").nullable().optional(),
    id: z.string().optional(),
  })
).refine(passwordMatch, {
  message: "Password and confirm password do not match",
  path: ["confirmPassword"],
});

export const UserUpdateSchemaServerAction = UserRegisterSchema.merge(
  z.object({
    password: z
      .union([z.string().regex(passwordRegex, { message: "Your password is not valid" }), z.string().length(0)])
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    prefixName: z.string().min(1, "Prefix name is required").nullable().optional(),
    firstName: z.string().min(1, "First name is required").nullable().optional(),
    lastName: z.string().min(1, "Last name is required").nullable().optional(),
    id: z.string().optional(),
    image: z
      .custom<File>()
      .refine((e) => {
        return e?.size ?? 0 <= MAX_IMAGE_FILE_SIZE;
      }, `Max image size is 5MB.`)
      .refine((e) => {
        if (!e) return true;
        return ACCEPTED_IMAGE_TYPES.includes(e.type);
      }, "Only .jpg, .jpeg, .png and .webp formats are supported.")
      .optional(),
  })
);

/////////////////////////////////////////
// Hospitals
/////////////////////////////////////////

export const HospitalSchema = z.object({
  id: z.coerce.number().int({ message: "Invalid hospital ID" }),
  hospitalName: z.string().min(1, "Hospital name is required"),
});

/////////////////////////////////////////
// Referral Request
/////////////////////////////////////////

export const CreatePatientSchema = z.object({
  citizenId: z.string().min(1, "โปรดระบุเลขหมายบัตรประชาชน").refine(isValidThaiID, { message: "Invalid Citizen ID" }),
  patientFirstname: z.string().min(1, "โปรดระบุชื่อจริง"),
  patientSurname: z.string().min(1, "โปรดระบุนามสกุล"),
  birthDate: z.coerce.date({
    errorMap: () => ({ message: "โปรดระบุวันเดือนปีเกิด" }),
  }),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "โปรดระบุเพศ" }),
  }),
  phone: z
    .union([z.string().regex(phoneNumberRegex, { message: "โปรดระบุหมายเลขโทรศัพท์ที่ถูกต้อง" }), z.string().length(0)])
    .optional(),
  bloodType: z.nativeEnum(BloodType, {
    errorMap: () => ({ message: "โปรดระบุกรุ๊ปเลือด" }),
  }),
  houseNumber: z.string().optional(),
  moo: z
    .string()
    .optional()
    .transform((val) => {
      return val;
    }),
  subDistrict: z.string().optional(),
  subArea: z.string().optional(),
  province: z.string().optional(),
  postalCode: z
    .union([z.string().regex(postalCodeRegex, { message: "โปรดระบุรหัสไปรษณีย์ที่ถูกต้อง" }), z.string().length(0)])
    .optional(),
});

export const CreateReferalRequestSchema = z.object({
  senderHospital: z.coerce.number().gt(0, { message: "การกำหนดโรงพยาบาลเริ่มต้นทางผิดพลาด" }),
  startHospital: z.coerce.number().gt(0, { message: "การกำหนดโรงพยาบาลเริ่มต้นผิดพลาด" }),
  receiverHospital: z.coerce.number().gt(0, { message: "กรุณาเลือกโรงพยาบาลปลายทาง" }),
  patientId: z.coerce.number().gt(0, { message: "การกำหนดหมายเลขผู้ป่วยผิดพลาด" }),
});

export const EditReceiverHospitalReferalRequestSchema = z.object({
  receiverHospital: z.coerce.number().gt(0, { message: "กรุณาเลือกโรงพยาบาลปลายทาง" }),
});

export const CreateMedicalRecordSchema = z.object({
  doctorId: z.coerce.string().min(1, "Doctor ID is required"),
  detail: z.string(),
  images: z.custom<FileUpload[]>(),
});

const PreparedMedSchema = CreateMedicalRecordSchema.merge(
  z.object({
    images: z.custom<FormData>(),
  })
);

export const CreateMedicalRecordSchemaBackEnd = z.array(PreparedMedSchema);
