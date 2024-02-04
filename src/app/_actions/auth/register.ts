"use server";

import { RegisterSchema } from "@/app/_schemas";
import type * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/server/db";

export const register = async (value: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name, role } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const exitstingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (exitstingUser) {
      return { error: "Email already exists" };
    }

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });
  } catch (error) {
    return { error: "Error creating user" };
  }

  return { success: "Email sent!" };
};
