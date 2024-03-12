"use server";
import { db } from "@/server/db";
import { Patient_infoSchema, UserSchema } from "@/app/_schemas/generated/zod";
import { type User } from "@/app/_schemas/generated/zod";

interface UserResponse {
  success: boolean;
  msg: string;
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserAll = async (): Promise<User[]> => {
  try {
    const users = await db.user.findMany();
    return users;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const createUser = async (data: unknown) => {
  const validData = Patient_infoSchema.omit({ id: true }).safeParse(data);

  if (!validData.success) {
    return {
      error: validData.error.flatten(),
      success: false,
    };
  }

  console.log(validData.data);
  return {
    success: true,
    msg: "User created",
  };
};
