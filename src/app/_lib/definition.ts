import { type UserSchemaWithOutPassword } from "@/app/_schemas";
import type { z } from "zod";
import { type Role, type Gender } from "@prisma/client";
import { type UserSchema } from "@/app/_schemas/generated/zod";
import { AiOutlineUser, AiOutlineCalendar, AiFillHeart, AiOutlinePhone, AiOutlineHome } from "react-icons/ai";
import { FaTransgender } from "react-icons/fa";
import type { IconType } from "react-icons";

export const LIMIT_PER_PAGE = 10;
export const MAX_IMAGE_FILE_SIZE = 3 * 1024 * 1024; // 3MB
export const MAX_MEDRECORD_IMAGE_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const SECURE_IMAGE_ENDPOINT = "/api/secureimg";
export const HOSPITAL_REFER_DRAWER_ID = "hospital-refer-drawer";

export const ROLE_NAME: Record<Role, string> = {
  ADMIN: "ผู้ดูแลระบบ",
  PHYSICIAN: "แพทย์",
  MEDICAL_ASSISTANT: "ผู้ช่วยแพทย์",
  GUEST: "ผู้ใช้ทั่วไป",
};

export const patientSummaryHeaders = {
  citizenId: "เลขประจำตัวประชาชน",
  patientFirstname: "ชื่อ",
  patientSurname: "นามสกุล",
  birthDate: "วันเกิด",
  gender: "เพศ",
  phone: "เบอร์โทรศัพท์",
  bloodType: "หมู่เลือด",
  houseNumber: "บ้านเลขที่",
  moo: "หมู่ที่",
  subDistrict: "ตำบล",
  subArea: "แขวง/อำเภอ",
  province: "จังหวัด",
  postalCode: "รหัสไปรษณีย์",
};

export const patientSummaryHeadersIcon: Record<
  keyof typeof patientSummaryHeaders,
  { icon: IconType; color: string } | null
> = {
  citizenId: {
    icon: AiOutlineUser,
    color: "purple.500",
  },
  patientFirstname: {
    icon: AiOutlineUser,
    color: "purple.500",
  },
  patientSurname: {
    icon: AiOutlineUser,
    color: "purple.500",
  },
  birthDate: {
    icon: AiOutlineCalendar,
    color: "orange.400",
  },
  bloodType: {
    icon: AiFillHeart,
    color: "red.400",
  },
  gender: {
    icon: FaTransgender,
    color: "orange.400",
  },
  phone: {
    icon: AiOutlinePhone,
    color: "green.500",
  },
  houseNumber: {
    icon: AiOutlineHome,
    color: "blue.500",
  },
  moo: {
    icon: AiOutlineHome,
    color: "blue.500",
  },
  subDistrict: {
    icon: AiOutlineHome,
    color: "blue.500",
  },
  subArea: {
    icon: AiOutlineHome,
    color: "blue.500",
  },
  province: {
    icon: AiOutlineHome,
    color: "blue.500",
  },
  postalCode: {
    icon: AiOutlineHome,
    color: "blue.500",
  },
};

export const GENDER_NAME: Record<Gender, string> = {
  FEMALE: "หญิง",
  MALE: "ชาย",
  UNDEFINED: "ไม่ระบุเพศ",
};

type Response<TData> =
  | {
      success: true;
      message: string;
      data?: TData;
    }
  | {
      success: false;
      message: {
        error: string;
      };
    };

export type PromiseResponse<TData> = Promise<Response<TData>>;

export type UserWithOutPassword = z.infer<typeof UserSchemaWithOutPassword>;
export type User = z.infer<typeof UserSchema>;

export type MedRecItem = {
  id: string;
  doctorId: string;
  detail: string;
  images: FileUpload[];
};

export type PreparedMedRecItem = {
  id: string;
  doctorId: string;
  detail: string;
  images: FormData;
};

export type FileUpload = {
  id: string;
  data: File;
};

export type Step = {
  title: string;
  description: string;
  description2: string;
};
