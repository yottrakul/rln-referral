"use server";

import { db } from "@/server/db";
import { unstable_noStore as noStore } from "next/cache";

export const getMedRecord = async (id: string) => {
  noStore();
  try {
    const res = await db.med_record.findMany({
      where: {
        caseId: id,
      },
    });

    return res;
  } catch (error) {
    throw new Error(`Error fetching user id: ${id}`);
  }
};
