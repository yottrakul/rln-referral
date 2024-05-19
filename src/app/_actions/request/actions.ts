"use server";
import { db } from "@/server/db";
import type { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";

type SteperCaseType = `${Status}_${Status}`;

export const getRequest = async (id: string) => {
  try {
    const request = await db.referralCase.findUnique({
      where: {
        id,
      },
    });
    return request;
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};

export const getCaseProgress = async (caseId: string) => {
  let currStep = 0;
  const stepsPayload = [
    { title: "สร้างคำขอ", description: "ไม่พบข้อมูล", description2: "ไม่พบข้อมูล" },
    { title: "ส่งคำขอ", description: "ไม่พบข้อมูล", description2: "ไม่พบข้อมูล" },
    { title: "รับคำขอ", description: "ไม่พบข้อมูล", description2: "ไม่พบข้อมูล" },
    { title: "ปิดคำขอ", description: "ไม่พบข้อมูล", description2: "ไม่พบข้อมูล" },
  ];

  const status = await db.log_case_status.findMany({
    where: {
      caseId: caseId,
    },
  });

  status.forEach((item) => {
    const date = item.changeAt.toLocaleDateString();
    const time = item.changeAt.toLocaleTimeString();
    currStep++;
    switch ((item.statusFrom + "_" + item.statusTo) as SteperCaseType) {
      case "NONE_PENDING":
        stepsPayload[0]!.description = date;
        stepsPayload[0]!.description2 = time;
        break;
      case "PENDING_PENDING":
        stepsPayload[1]!.description = date;
        stepsPayload[1]!.description2 = time;
        break;
      case "PENDING_ACCEPT":
        stepsPayload[2]!.description = date;
        stepsPayload[2]!.description2 = time;
        break;
      case "ACCEPT_COMPLETE":
        stepsPayload[3]!.description = date;
        stepsPayload[3]!.description2 = time;
        break;
    }
  });

  currStep = status.length - 1;
  // ถ้าเป็นขั้นตอนสุดท้าย ให้จบไปเลย
  if (currStep === stepsPayload.length - 1) {
    currStep++;
  }

  return {
    steps: stepsPayload,
    currentStep: currStep,
  };
};

export const cancelCase = async (caseId: string) => {
  try {
    await db.referralCase.delete({
      where: {
        id: caseId,
      },
    });
    // revalidatePath(`/request/${caseId}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong!");
    }
  }
};

export const rejectCase = async (caseId: string) => {
  try {
    await db.referralCase.update({
      where: {
        id: caseId,
      },
      data: {
        status: "REJECT",
      },
    });
    revalidatePath(`/request/${caseId}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong!");
    }
  }
};

export const acceptCase = async (caseId: string) => {
  try {
    await db.referralCase.update({
      where: {
        id: caseId,
      },
      data: {
        status: "ACCEPT",
        logCaseStatus: {
          upsert: {
            where: {
              caseId_statusTo_statusFrom: {
                caseId,
                statusFrom: "PENDING",
                statusTo: "ACCEPT",
              },
            },
            create: {
              statusFrom: "PENDING",
              statusTo: "ACCEPT",
              changeAt: new Date(),
            },
            update: {
              changeAt: new Date(),
            },
          },
        },
      },
    });
    revalidatePath(`/request/${caseId}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong!");
    }
  }
};

export const endCase = async (caseId: string) => {
  try {
    await db.referralCase.update({
      where: {
        id: caseId,
        status: "ACCEPT",
      },
      data: {
        status: "COMPLETE",
        logCaseStatus: {
          create: {
            statusFrom: "ACCEPT",
            statusTo: "COMPLETE",
          },
        },
      },
    });
    revalidatePath(`/request/${caseId}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong!");
    }
  }
};

export const reSendCaseBySender = async (caseId: string, hospitalId: number) => {
  try {
    const request = await db.referralCase.findUnique({
      where: {
        id: caseId,
      },
    });

    if (request?.senderHospital === hospitalId) {
      throw new Error("ไม่สามารถส่งคำขอไปยังโรงพยาบาลต้นทางได้");
    }

    if (request?.receiverHospital === hospitalId) {
      throw new Error("ไม่สามารถส่งคำขอไปยังโรงพยาบาลปลายทางเดิมได้");
    }

    await db.referralCase.update({
      where: {
        id: caseId,
      },
      data: {
        receiverHospital: hospitalId,
        status: "PENDING",
        logCaseStatus: {
          update: {
            where: {
              caseId_statusTo_statusFrom: {
                caseId,
                statusFrom: "PENDING",
                statusTo: "PENDING",
              },
            },
            data: {
              changeAt: new Date(),
            },
          },
        },
      },
    });
    revalidatePath(`/request/${caseId}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong!");
    }
  }
};

export const reSendCaseByReceiver = async (caseId: string, toHospitalId: number) => {
  try {
    const request = await db.referralCase.findUnique({
      where: {
        id: caseId,
      },
    });

    if (!request) {
      throw new Error("ไม่พบคำขอนี้");
    }

    if (request?.senderHospital === toHospitalId) {
      throw new Error("ไม่สามารถส่งคำขอไปยังโรงพยาบาลต้นทางได้");
    }

    if (request?.receiverHospital === toHospitalId) {
      throw new Error("ไม่สามารถส่งคำขอไปยังโรงพยาบาลปลายทางเดิมได้");
    }

    await db.referralCase.update({
      where: {
        id: caseId,
      },
      data: {
        senderHospital: request.receiverHospital,
        receiverHospital: toHospitalId,
        status: "PENDING",
        logCaseStatus: {
          update: {
            where: {
              caseId_statusTo_statusFrom: {
                caseId,
                statusFrom: "PENDING",
                statusTo: "PENDING",
              },
            },
            data: {
              changeAt: new Date(),
            },
          },
        },
      },
    });
    revalidatePath(`/request/${caseId}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong!");
    }
  }
};
