import { type UserSchemaWithOutPassword } from "@/app/_schemas";
import type { z } from "zod";
import { type Role } from "@prisma/client";
import { type UserSchema } from "@/app/_schemas/generated/zod";

export const LIMIT_PER_PAGE = 10;
export const MAX_IMAGE_FILE_SIZE = 3 * 1024 * 1024; // 3MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const SECURE_IMAGE_ENDPOINT = "/api/secureimg";

export const ROLE_NAME: Record<Role, string> = {
  ADMIN: "ผู้ดูแลระบบ",
  PHYSICIAN: "แพทย์",
  MEDICAL_ASSISTANT: "ผู้ช่วยแพทย์",
  GUEST: "ผู้ใช้ทั่วไป",
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
