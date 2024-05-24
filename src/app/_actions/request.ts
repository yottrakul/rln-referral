"use server";

import { db } from "@/server/db";
import type { Prisma } from "@prisma/client";
import { cache } from "react";

export const getCase = async (
  page: number,
  search: string,
  date: string,
  hospitalSearch: string,
  senrec: string,
  hospitalId: number
) => {
  try {
    const wherePatient: Prisma.PatientWhereInput = {};

    const whereCase: Prisma.ReferralCaseWhereInput = {};

    if (hospitalId != 0) {
      if (senrec == "1") {
        // whereCase.senderHospital = hospitalId;
        // whereCase.startHospital = hospitalId;
        whereCase.OR = [
          { startHospital: hospitalId },
          {
            senderHospital: hospitalId,
          },
        ];
      } else {
        whereCase.receiverHospital = hospitalId;
      }
    }

    if (hospitalSearch) {
      if (senrec == "1") {
        whereCase.receiverHospital = Number(hospitalSearch);
      } else {
        whereCase.senderHospital = Number(hospitalSearch);
        whereCase.startHospital = hospitalId;
      }
    }

    if (search || date) {
      if (date) {
        wherePatient.birthDate = date + "T00:00:00.000Z";
      }

      if (search) {
        wherePatient.OR = [
          {
            citizenId: { contains: search, mode: "insensitive" },
          },
          {
            patientFirstname: { contains: search, mode: "insensitive" },
          },
          {
            patientSurname: { contains: search, mode: "insensitive" },
          },
        ];
      }

      const patient = await db.patient.findMany({
        where: wherePatient,
      });

      if (patient.length > 0) {
        whereCase.OR = [];
        patient.map((v) => {
          whereCase.OR?.push({ patientId: v.id });
        });

        const cases = await db.referralCase.findMany({
          skip: page,
          take: 12,
          where: whereCase,
        });

        return cases;
      } else {
        return [];
      }
    } else {
      const cases = await db.referralCase.findMany({
        skip: page,
        take: 12,
        where: whereCase,
      });
      return cases;
    }
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const getPatient = async (id: number) => {
  try {
    const patient = await db.patient.findUnique({
      where: { id: id },
    });
    return patient;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const getHospital = cache(async (id: number) => {
  try {
    const hospital = await db.hospital.findUnique({
      where: { id: id },
    });
    return hospital;
  } catch (error) {
    throw new Error("Error fetching users");
  }
});

export const getHospitalAll = async () => {
  try {
    const hospital = await db.hospital.findMany({});
    return hospital;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};
