"use server";
import { db } from "@/server/db";
import { type Status } from "@prisma/client";

export const getAllProcessList = async (status: Status) => {
  try {
    const referralCase = await db.referralCase.findMany({
      where: {
        status,
      },
    });
    return referralCase;
  } catch (error) {
    return null;
  }
};
