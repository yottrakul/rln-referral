"use server";

import { db } from "@/server/db";
import { RegisterSchema, RoleSchema, UserRegisterWithRefineSchema } from "@/app/_schemas";
import { type z } from "zod";
import { getValidPage, prismaExclude } from "@/app/_lib";
import bcrypt from "bcryptjs";
import { type Prisma, type Role } from "@prisma/client";
import { type HospitalRegisterSchema } from "../_components/ui/back_office/HospitalRegister";
import { type Hospital } from "@prisma/client";
import { type PromiseResponse } from "@/app/_lib/definition";
import { type UserWithOutPassword } from "@/app/_lib/definition";
import { unstable_noStore as noStore } from "next/cache";
import { LIMIT_PER_PAGE } from "@/app/_lib/definition";

export const getUserAll = async () => {
  try {
    const users = await db.user.findMany({
      select: prismaExclude("User", ["password"]),
    });
    return users as UserWithOutPassword[];
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const getUserById = async (id: string) => {
  noStore();
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: prismaExclude("User", ["password"]),
    });

    return user as UserWithOutPassword;
  } catch (error) {
    throw new Error(`Error fetching user id: ${id}`);
  }
};

export const createUser = async (data: unknown) => {
  const validData = RegisterSchema.safeParse(data);
  if (!validData.success) {
    console.error(validData.error.flatten());
    throw new Error("Invalid data format");
  }

  const { email, name, password, role, hospitalId } = validData.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
        hospitalId,
      },
      select: prismaExclude("User", ["password"]),
    });

    return user as UserWithOutPassword;
  } catch (error) {
    return null;
  }
};

// export const updateUser = async (id: string, data: unknown) => {
//   const validData = UserRegisterWithRefineSchema.safeParse(data);
//   if (!validData.success) {
//     console.error(validData.error.flatten());
//     throw new Error("Invalid data format");
//   }

//   const { name, role, hospitalId, image, password } = validData.data;
//   const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
//   let updateData: Prisma.UserUpdateInput;

//   try {
//     const haveProvider = await db.user.findUnique({
//       where: {
//         id,
//       },
//       select: {
//         accounts: {
//           select: {
//             provider: true,
//           },
//         },
//       },
//     });

//     if (haveProvider) {
//       updateData = {
//         name,
//         role,
//         hospital: {
//           update: {
//             id: hospitalId ?? undefined,
//           },
//         },
//         image,
//       };
//     } else {
//       updateData = {
//         name,
//         role,
//         hospital: {
//           update: {
//             id: hospitalId ?? undefined,
//           },
//         },
//         image,
//         password: hashedPassword,
//       };
//     }

//     const user = await db.user.update({
//       where: {
//         id,
//       },
//       data: updateData,
//       select: prismaExclude("User", ["password"]),
//     });

//     return {
//       success: true,
//       message: `User id: ${id} updated`,
//       user,
//     };
//   } catch (error) {
//     throw new Error(`Error updating user id: ${id}`);
//   }
// };

export const deleteUser = async (id: string) => {
  try {
    const user = await db.user.delete({
      where: {
        id,
      },
    });

    return user as UserWithOutPassword;
  } catch (error) {
    throw new Error(`Error deleting user id: ${id}`);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: prismaExclude("User", ["password"]),
    });

    return user as UserWithOutPassword;
  } catch (error) {
    throw new Error(`Error fetching user email: ${email}`);
  }
};

export const getUserByRole = async (role: Role) => {
  try {
    const users = await db.user.findMany({
      where: {
        role,
      },
      select: prismaExclude("User", ["password"]),
    });

    return users as UserWithOutPassword[];
  } catch (error) {
    return null;
  }
};

export const getUserByHospital = async (hospitalId: number) => {
  try {
    const users = await db.user.findMany({
      where: {
        hospitalId,
      },
      select: prismaExclude("User", ["password"]),
    });

    return users as UserWithOutPassword[];
  } catch (error) {
    return null;
  }
};

export const getUserByProvider = async (provider: string) => {
  try {
    const users = await db.user.findMany({
      where: {
        accounts: {
          some: {
            provider,
          },
        },
      },
      select: prismaExclude("User", ["password"]),
    });

    return users as UserWithOutPassword[];
  } catch (error) {
    return null;
  }
};

export const getUserByQueryAndRole = async (query: string, role?: string, page = "1") => {
  noStore();
  // check page is valid
  const validPage = getValidPage(page);
  // check role is valid
  role = role?.toUpperCase();
  const validRole = RoleSchema.safeParse(role);

  if (!validRole.success || role?.length === 0) {
    role = undefined;
  }

  const queryUser: Prisma.UserFindManyArgs = {
    where: {
      role: role as Role,
      OR: [
        {
          email: {
            contains: query,
          },
        },
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    select: prismaExclude("User", ["password"]),
    take: LIMIT_PER_PAGE,
    skip: (validPage - 1) * LIMIT_PER_PAGE,
  };

  try {
    // const users = await db.user.findMany(queryUser);
    const [users, total] = await db.$transaction([
      db.user.findMany(queryUser),
      db.user.count({
        where: queryUser.where,
      }),
    ]);

    return {
      pegination: {
        total,
      },
      data: users as UserWithOutPassword[],
    };
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

// Method for form HospitalRegister
export const createHospital = async ({
  hospitalName,
}: z.infer<typeof HospitalRegisterSchema>): PromiseResponse<Hospital> => {
  try {
    const exitingHospital = await db.hospital.findUnique({
      where: {
        hospitalName,
      },
    });

    if (exitingHospital) {
      return {
        success: false,
        message: {
          error: "Hospital already exists",
        },
      };
    }

    const hospital = await db.hospital.create({
      data: {
        hospitalName,
      },
    });

    return {
      success: true,
      message: `Hospital created (ID: ${hospital.id})`,
      data: hospital,
    };
  } catch (error) {
    return {
      success: false,
      message: {
        error: "Error creating hospital",
      },
    };
  }
};

export const getHospitalAll = async () => {
  try {
    const hospitals = await db.hospital.findMany();
    return hospitals;
  } catch (error) {
    throw new Error("Error fetching hospitals");
  }
};
