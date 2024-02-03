"use server";

import { type LoginSchema } from "@/app/schemas";
import type * as z from "zod";

export const login = (value: z.infer<typeof LoginSchema>) => {
  // const validatedFields = LoginSchema.safeParse(value);

  // if (!validatedFields.success) {
  //   return { error: "Invalid fields" };
  // }

  // const { email, password } = validatedFields.data;

  // return validatedFields.data;
  console.log(value);
};
