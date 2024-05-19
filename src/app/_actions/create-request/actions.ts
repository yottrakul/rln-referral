"use server";

import { type PromiseResponse } from "@/app/_lib/definition";
import { CreateMedicalRecordSchemaBackEnd, CreatePatientSchema, CreateReferalRequestSchema } from "@/app/_schemas";
import { type Patient, PatientSchema, PatientPartialSchema } from "@/app/_schemas/generated/zod";
import { db } from "@/server/db";
import { isUndefined } from "lodash";
import { type z } from "zod";
import { type UserWithOutPassword } from "@/app/_lib/definition";
import { prismaExclude, usersImageAdaptor } from "@/app/_lib";
import { unstable_noStore as noStore } from "next/cache";
import { toPDF } from "@/app/_lib/pdf/core";
import { uploadFileType } from "@/app/_actions/s3/actions";

export const createCase = async (data: unknown, medData: unknown) => {
  const safeData = CreateReferalRequestSchema.safeParse(data);
  const safeMedData = CreateMedicalRecordSchemaBackEnd.safeParse(medData);

  if (!safeData.success || !safeMedData.success) {
    if (!safeData.success) {
      console.error(safeData.error.flatten());
    }
    if (!safeMedData.success) {
      console.error(safeMedData.error.flatten());
    }
    throw new Error("Bad Request");
  }

  try {
    // Create Case
    const caseData = await db.referralCase.upsert({
      where: {
        patientId: safeData.data.patientId,
      },
      create: {
        ...safeData.data,
        status: "PENDING",
      },
      update: {
        senderHospital: safeData.data.senderHospital,
        receiverHospital: safeData.data.receiverHospital,
        status: "PENDING",
      },
    });

    await db.log_case_status.upsert({
      where: {
        caseId_statusTo_statusFrom: {
          caseId: caseData.id,
          statusFrom: "NONE",
          statusTo: "PENDING",
        },
      },
      create: {
        statusFrom: "NONE",
        statusTo: "PENDING",
        caseId: caseData.id,
      },
      update: {
        changeAt: new Date(),
      },
    });

    await db.log_case_status.upsert({
      where: {
        caseId_statusTo_statusFrom: {
          caseId: caseData.id,
          statusFrom: "PENDING",
          statusTo: "PENDING",
        },
      },
      create: {
        statusFrom: "PENDING",
        statusTo: "PENDING",
        caseId: caseData.id,
      },
      update: {
        changeAt: new Date(),
      },
    });

    // End Create Case
    // ทำแค่รองรับ Med ตัวเดียว!!
    // PDF Section
    if (safeMedData.data.length > 0 && safeMedData.data[0]) {
      // Create MedRecord Section
      const medRecordData = await db.med_record.create({
        data: {
          detail: safeMedData.data[0].detail,
          caseId: caseData.id,
          doctorId: safeMedData.data[0].doctorId,
        },
      });

      // Convert Image to PDF one file
      console.log(safeMedData.data);
      const medImages = Object.entries(Object.fromEntries(safeMedData.data[0].images));

      // If image to upload
      if (medImages.length > 0) {
        const prePdfFile = safeMedData.data.map((item) => {
          const _data = Object.entries(Object.fromEntries(item.images)).map((i) => {
            return i[1] as File;
          });
          console.log(_data);
          return toPDF(_data);
        });

        const postPdfFile = await Promise.all(prePdfFile); // Array

        console.log(postPdfFile[0]);

        if (postPdfFile[0]) {
          const res = await uploadFileType(Buffer.from(postPdfFile[0]), "application/pdf");
          if (res.success) {
            console.log(res.data);
            if (res.data) {
              await db.med_record.update({
                where: {
                  id: medRecordData.id,
                },
                data: {
                  fileKey: res.data,
                },
              });
            }
          }
        }
      }
      // EndIf image to upload

      // Upload PDF
    }

    return caseData;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return null;
    } else {
      console.error(error);
      return null;
    }
  }

  // End PDF Section

  // Upload MedRecord when have
  // await uploadMedRecord(medRecData);
  // Create Case
};

export const testCase = async (data: unknown) => {
  console.log(data);
  // Upload MedRecord when have
  // await uploadMedRecord(medRecData);
  // Create Case
};

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

export const getAllDoctors = async (): PromiseResponse<UserWithOutPassword[]> => {
  noStore();
  try {
    const doctors = await db.user.findMany({
      where: {
        role: "PHYSICIAN",
      },
      select: prismaExclude("User", ["password"]),
    });

    const doctorWithSecureImg = usersImageAdaptor(doctors) as typeof doctors;

    return {
      success: true,
      message: "Get all doctors success",
      data: doctorWithSecureImg,
    };
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

export const getHopitalNameFromDoctorId = async (doctorId: string): PromiseResponse<string> => {
  try {
    const doctor = await db.user.findUnique({
      where: {
        id: doctorId,
      },
      select: {
        hospital: {
          select: {
            hospitalName: true,
          },
        },
      },
    });

    return {
      success: true,
      message: "Get hospital name success",
      data: doctor?.hospital?.hospitalName ?? "ไม่พบข้อมูลโรงพยาบาล",
    };
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

export const getMedicalRecords = async (caseId?: string) => {
  if (isUndefined(caseId)) throw new Error("CaseId is required");
  try {
    const medicals = db.med_record.findMany({
      where: {
        caseId,
      },
      include: {
        doctor: {
          include: {
            hospital: {
              select: {
                hospitalName: true,
              },
            },
          },
        },
        cases: true,
      },
    });

    return medicals;
  } catch (error) {
    console.error(error);
    throw new Error("Can't get medical records");
  }
};

export const getCaseFromPatientId = async (patientId: number) => {
  try {
    const caseData = await db.referralCase.findUnique({
      where: {
        patientId,
      },
    });
    return caseData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
