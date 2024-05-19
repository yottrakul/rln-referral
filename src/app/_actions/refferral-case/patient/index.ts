"use server";

import { db } from "@/server/db";

export const getPatientById = async (id: number) => {
  try {
    const patient = await db.patient.findUnique({
      where: {
        id,
      },
    });

    return patient;
  } catch (error) {
    throw new Error("Error fetching patient");
  }
};
