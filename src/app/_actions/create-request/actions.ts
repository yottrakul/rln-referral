"use server";

import { type PromiseResponse } from "@/app/_lib/definition";
import { CreatePatientSchema } from "@/app/_schemas";
import { type Patient, PatientSchema, PatientPartialSchema } from "@/app/_schemas/generated/zod";
import { db } from "@/server/db";
import { isUndefined } from "lodash";
import { type z } from "zod";

export const createRequest = async (data: unknown): PromiseResponse<Patient> => {
  try {
    console.log(data);
    const safeBody = CreatePatientSchema.safeParse(data);
    // validation data
    if (!safeBody.success) {
      console.error(safeBody.error.flatten());
      throw new Error("Invalid Form!");
    }

    const safeData = safeBody.data;
    console.log(safeData);
    // return {
    //   success: true,
    //   message: "200 OK",
    //   data: safeData,
    // };

    const patient = await db.patient.upsert({
      where: {
        citizenId: safeData.citizenId,
      },
      create: {
        ...safeData,
      },
      update: {
        ...safeData,
        citizenId: undefined,
      },
    });

    return {
      success: true,
      message: "Create/Update patient success",
      data: patient,
    };

    // handle Error
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: {
          error: error.message,
        },
      };
    } else {
      return {
        success: false,
        message: {
          error: "Something went wrong!",
        },
      };
    }
  }
};

type CreatePatientSchemaType = z.infer<typeof CreatePatientSchema>;

export const getPatientByCitizenId = async (citizenId: string): PromiseResponse<CreatePatientSchemaType> => {
  try {
    const exitPatient = await db.patient.findUnique({
      where: {
        citizenId,
      },
    });

    if (exitPatient) {
      const safeData = CreatePatientSchema.safeParse(exitPatient);
      if (safeData.success) {
        return {
          success: true,
          message: "Have patient info in database",
          data: safeData.data,
        };
      } else {
        console.error(safeData.error.flatten());
        throw new Error("Can't not validation data");
      }
    } else {
      throw new Error("Patient does not exit!");
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: {
          error: error.message,
        },
      };
    } else {
      return {
        success: false,
        message: {
          error: "Something went wrong!",
        },
      };
    }
  }
};
