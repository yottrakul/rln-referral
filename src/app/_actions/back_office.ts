"use server";

import { db } from "@/server/db";
import { RoleSchema, CreateUserSchema, UserUpdateSchemaServerAction } from "@/app/_schemas";
import { type z } from "zod";
import { getValidPage, prismaExclude, usersImageAdaptor, userImageAdaptor } from "@/app/_lib";
import bcrypt from "bcryptjs";
import { type Prisma, type Role } from "@prisma/client";
import { type HospitalRegisterSchema } from "../_components/ui/back_office/HospitalRegister";
import { type Hospital } from "@prisma/client";
import { type PromiseResponse } from "@/app/_lib/definition";
import { type UserWithOutPassword } from "@/app/_lib/definition";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { LIMIT_PER_PAGE } from "@/app/_lib/definition";
import { type AccountType } from "@/app/_components/ui/back_office/UserModal";
import { uploadFile } from "@/app/_actions/s3/actions";

export const getUserAll = async () => {
  try {
    const users = await db.user.findMany({
      select: prismaExclude("User", ["password"]),
    });
    return users as UserWithOutPassword[];
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const getUserById = async (id: string) => {
  noStore();
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: prismaExclude("User", ["password"]),
    });

    if (user) {
      return userImageAdaptor(user);
    }

    return null;
  } catch (error) {
    throw new Error(`Error fetching user id: ${id}`);
  }
};

export const getUserAccountTypeById = async (id: string): Promise<AccountType | null | undefined> => {
  noStore();
  try {
    const userAccountsType = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        accounts: {
          select: {
            type: true,
          },
        },
      },
    });

    if (userAccountsType) {
      return userAccountsType.accounts[0]?.type as AccountType;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(`Error fetching user id: ${id}`);
  }
};

export const createUser = async (data: unknown): PromiseResponse<UserWithOutPassword> => {
  const validData = CreateUserSchema.safeParse(data);
  if (!validData.success) {
    console.error(validData.error.flatten());
    return {
      success: false,
      message: {
        error: "Invalid data format",
      },
    };
  }

  const { email, name, password, role, hospitalId, image } = validData.data;
  const exitUser = await getUserByEmail(email);
  if (exitUser) {
    return {
      success: false,
      message: {
        error: "User already exists",
      },
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
        hospitalId,
        image,
      },
      select: prismaExclude("User", ["password"]),
    });

    revalidatePath("/backoffice_user");

    return {
      success: true,
      message: `User created (ID: ${user.id})`,
      data: user as UserWithOutPassword,
    };
  } catch (error) {
    return {
      success: false,
      message: {
        error: "Error creating user",
      },
    };
  }
};

export const updateUser = async (formData: FormData): PromiseResponse<UserWithOutPassword> => {
  try {
    const validData = UserUpdateSchemaServerAction.omit({ email: true }).safeParse(Object.fromEntries(formData));
    if (!validData.success) {
      console.error(validData.error.flatten());
      throw new Error("Invalid data format");
    }

    const userUpdateData = validData.data;
    // เอาไว้ดักกรณีไม่ได้เลือก รพ
    if (userUpdateData.hospitalId === 0) {
      userUpdateData.hospitalId = null;
    }
    // เพิ่ม Schema สำหรับ validate ข้อมูล เฉพาะ func นี้ โดยเฉพาะ image

    const userUpdateQuery: Prisma.UserUpdateArgs = {
      where: {
        id: userUpdateData.id,
      },
      data: {
        ...userUpdateData,
        image: undefined,
        password: undefined,
        id: undefined,
      },
      select: prismaExclude("User", ["password"]),
    };
    const accountType = await getUserAccountTypeById(validData.data.id ?? "");
    if (accountType !== "oauth") {
      if (userUpdateData.password) {
        userUpdateQuery.data.password = await bcrypt.hash(userUpdateData.password, 10);
      }
    }

    if (userUpdateData.image) {
      const imageFormData = new FormData();
      imageFormData.append("image", userUpdateData.image as Blob);
      const resUpload = await uploadFile(imageFormData);
      if (!resUpload.success) {
        throw new Error("Error uploading image");
      }
      const imageKey = resUpload.data;
      userUpdateQuery.data.image = imageKey;
    }

    const user = (await db.user.update(userUpdateQuery)) as UserWithOutPassword;
    revalidatePath("/backoffice_user");
    return {
      success: true,
      message: `User id: ${userUpdateData.id} updated`,
      data: user,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return {
        success: false,
        message: {
          error: error.message,
        },
      };
    } else {
      return {
        success: false,
        message: {
          error: "Error updating user",
        },
      };
    }
  }
};

export const deleteUser = async (id: string) => {
  try {
    const user = await db.user.delete({
      where: {
        id,
      },
    });

    return user as UserWithOutPassword;
  } catch (error) {
    throw new Error(`Error deleting user id: ${id}`);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: prismaExclude("User", ["password"]),
    });

    return user as UserWithOutPassword;
  } catch (error) {
    throw new Error(`Error fetching user email: ${email}`);
  }
};

export const getUserByRole = async (role: Role) => {
  try {
    const users = await db.user.findMany({
      where: {
        role,
      },
      select: prismaExclude("User", ["password"]),
    });

    return users as UserWithOutPassword[];
  } catch (error) {
    return null;
  }
};

export const getUserByHospital = async (hospitalId: number) => {
  try {
    const users = await db.user.findMany({
      where: {
        hospitalId,
      },
      select: prismaExclude("User", ["password"]),
    });

    return users as UserWithOutPassword[];
  } catch (error) {
    return null;
  }
};

export const getUserByProvider = async (provider: string) => {
  try {
    const users = await db.user.findMany({
      where: {
        accounts: {
          some: {
            provider,
          },
        },
      },
      select: prismaExclude("User", ["password"]),
    });

    return users as UserWithOutPassword[];
  } catch (error) {
    return null;
  }
};

export const getUserByQueryAndRole = async (query: string, role?: string, page = "1") => {
  noStore();
  // check page is valid
  const validPage = getValidPage(page);
  // check role is valid
  role = role?.toUpperCase();
  const validRole = RoleSchema.safeParse(role);

  if (!validRole.success || role?.length === 0) {
    role = undefined;
  }

  const queryUser: Prisma.UserFindManyArgs = {
    where: {
      role: role as Role,
      OR: [
        {
          email: {
            contains: query,
          },
        },
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    select: prismaExclude("User", ["password"]),
    take: LIMIT_PER_PAGE,
    skip: (validPage - 1) * LIMIT_PER_PAGE,
  };

  try {
    // const users = await db.user.findMany(queryUser);
    const [users, total] = await db.$transaction([
      db.user.findMany(queryUser),
      db.user.count({
        where: queryUser.where,
      }),
    ]);

    // map secureimg endpoint to image
    const usersSecureImg = usersImageAdaptor(users as UserWithOutPassword[]);

    return {
      pegination: {
        total,
      },
      data: usersSecureImg,
    };
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

// Method for form HospitalRegister
export const createHospital = async ({
  hospitalName,
}: z.infer<typeof HospitalRegisterSchema>): PromiseResponse<Hospital> => {
  try {
    const exitingHospital = await db.hospital.findUnique({
      where: {
        hospitalName,
      },
    });

    if (exitingHospital) {
      return {
        success: false,
        message: {
          error: "Hospital already exists",
        },
      };
    }

    const hospital = await db.hospital.create({
      data: {
        hospitalName,
      },
    });

    return {
      success: true,
      message: `Hospital created (ID: ${hospital.id})`,
      data: hospital,
    };
  } catch (error) {
    return {
      success: false,
      message: {
        error: "Error creating hospital",
      },
    };
  }
};

export const getHospitalAll = async () => {
  try {
    const hospitals = await db.hospital.findMany();
    return hospitals;
  } catch (error) {
    throw new Error("Error fetching hospitals");
  }
};
