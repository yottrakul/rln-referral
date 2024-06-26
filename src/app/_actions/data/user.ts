"use server";
import { db } from "@/server/db";
import { PatientSchema } from "@/app/_schemas/generated/zod";
import { type Status } from "@prisma/client";
import { type User } from "@/app/_schemas/generated/zod";

// const USER_LIMIT_PER_PAGE = 10;

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserAll = async (): Promise<User[]> => {
  try {
    return await db.user.findMany();
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const createUser = async (data: unknown) => {
  const validData = PatientSchema.omit({ id: true }).safeParse(data);

  if (!validData.success) {
    return {
      error: validData.error.flatten(),
      success: false,
    };
  }

  console.log(validData.data);
  return {
    success: true,
    msg: "User created",
  };
};

// export const getProcessListSender = async (hospitalId: number, page: number) => {
//   page = Math.max(1, page);

//   try {
//     const processList = await db.patient.findMany({
//       include: {
//         refCases: {
//           where: {
//             senderHospital: {
//               equals: hospitalId,
//             },
//           },
//           skip: (page - 1) * 10,
//           take: 10,
//         },
//       },
//     });

//     return processList;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const getProcessListRecive = async (hospitalId: number, page: number) => {
//   page = Math.max(1, page);

//   try {
//     const processList = await db.patient.findMany({
//       include: {
//         refCases: {
//           where: {
//             receiverHospital: {
//               equals: hospitalId,
//             },
//           },
//           skip: (page - 1) * 10,
//           take: 10,
//         },
//       },
//     });

//     return processList;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const getProcessListAR = async (
  status: Exclude<Status, "PENDING" | "COMPLETE">,
  hospitalId: number
  // page: number
) => {
  // page = Math.max(1, page);
  try {
    const processList = await db.referralCase.findMany({
      select: {
        id: true,
        status: true,
        patient: true,
        hospitalSend: true,
        hospitalReceive: true,
        startCaseFrom: true,
      },

      where: {
        status: status,
        senderHospital: hospitalId,
      },
    });
    console.dir(processList, { depth: Infinity });
    return processList;
  } catch (error) {
    throw error;
  }
};
