"use server";

import { RegisterSchema } from "@/app/schemas";
import type * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/server/db";

export const register = async (value: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name, role } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
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

  return { success: "Email sent!" };
};
