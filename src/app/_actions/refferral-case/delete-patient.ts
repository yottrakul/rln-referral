"use server";
import { db } from "@/server/db";

export const deletePatient = async (id: number) => {
  try {
    const patient = await db.patient.delete({
      where: {
        id,
      },
    });

    return `Delete Patient id: ${id} Success`;
  } catch (error) {
    throw new Error(`Error Deleting Patient id: ${id}`);
  }
};
