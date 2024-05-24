"use server";

import { db } from "@/server/db";

export const getHospitalNameById = async (id: number) => {
  try {
    const hospital = await db.hospital.findUnique({
      where: {
        id,
      },
    });
    return hospital?.hospitalName ?? "Unknown hospital name";
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
      throw new Error("Unknown error");
    }
  }
};
