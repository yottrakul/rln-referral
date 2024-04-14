"use server";
import { type PromiseResponse } from "@/app/_lib/definition";
import { db } from "@/server/db";

export const deletePatient = async (id: number): PromiseResponse<never> => {
  try {
    const patient = await db.patient.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: `Delete Patient id: ${id} Success`,
    };
  } catch (error) {
    return {
      success: false,
      message: {
        error: `Error Deleting Patient id: ${id}`,
      },
    };
  }
};
