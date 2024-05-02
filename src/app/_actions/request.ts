"use server";

import { db } from "@/server/db";
import { getValidPage, prismaExclude, usersImageAdaptor, userImageAdaptor } from "@/app/_lib";

export const getCase = async () => {
  try {
    const cases = await db.referralCase.findMany({
      where: {},
    });
    return cases;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};
