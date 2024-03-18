"use server";

import { db } from "@/server/db";
import { RegisterSchema, RoleSchema, UpdateUserSchema, type UserSchemaWithOutPassword } from "@/app/_schemas";
import { type z } from "zod";
import { prismaExclude } from "@/app/_lib";
import bcrypt from "bcryptjs";
import { type Prisma, type Role } from "@prisma/client";

export type UserWithOutPassword = z.infer<typeof UserSchemaWithOutPassword>;
const LIMIT_PER_PAGE = 10;

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
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: prismaExclude("User", ["password"]),
    });

    return user as UserWithOutPassword;
  } catch (error) {
    throw new Error(`Error fetching user id: ${id}`);
  }
};

export const createUser = async (data: unknown) => {
  const validData = RegisterSchema.safeParse(data);
  if (!validData.success) {
    console.error(validData.error.flatten());
    throw new Error("Invalid data format");
  }

  const { email, name, password, role, hospitalId } = validData.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
        hospitalId,
      },
      select: prismaExclude("User", ["password"]),
    });

    return user as UserWithOutPassword;
  } catch (error) {
    return null;
  }
};

export const updateUser = async (id: string, data: unknown) => {
  const validData = UpdateUserSchema.safeParse(data);
  if (!validData.success) {
    console.error(validData.error.flatten());
    throw new Error("Invalid data format");
  }

  const { name, role, hospitalId, image, password } = validData.data;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
  let updateData: Prisma.UserUpdateInput;

  try {
    const haveProvider = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        accounts: {
          select: {
            provider: true,
          },
        },
      },
    });

    if (haveProvider) {
      updateData = {
        name,
        role,
        hospital: {
          update: {
            id: hospitalId,
          },
        },
        image,
      };
    } else {
      updateData = {
        name,
        role,
        hospital: {
          update: {
            id: hospitalId,
          },
        },
        image,
        password: hashedPassword,
      };
    }

    const user = await db.user.update({
      where: {
        id,
      },
      data: updateData,
      select: prismaExclude("User", ["password"]),
    });

    return {
      success: true,
      message: `User id: ${id} updated`,
      user,
    };
  } catch (error) {
    throw new Error(`Error updating user id: ${id}`);
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

export const getUserByQueryAndRole = async (query: string, role?: string) => {
  role = role?.toUpperCase();
  const validRole = RoleSchema.safeParse(role);

  if (!validRole.success || role?.length === 0) {
    role = undefined;
  }

  // const isInRoleEnum = Object.values(Role).includes(role as Role);
  // Checl valid role from Role enum
  // if (!validRole.data || role?.length === 0) {
  //   role = undefined;
  // }

  try {
    const users = await db.user.findMany({
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
    });

    return users as UserWithOutPassword[];
  } catch (error) {
    throw new Error("Error fetching users");
  }
};
