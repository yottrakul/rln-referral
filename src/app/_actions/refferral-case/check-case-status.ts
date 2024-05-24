"use server";

import { db } from "@/server/db";
import type { Status } from "@prisma/client";

export const checkCaseIs = async (caseId: string, status: Status) => {
  try {
    const caseData = await db.referralCase.findUnique({
      where: {
        id: caseId,
      },
    });

    if (!caseData) {
      throw new Error("Case not found!");
    }

    return caseData.status === status;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      console.error(error);
      throw new Error("Something went wrong!");
    }
  }
};
