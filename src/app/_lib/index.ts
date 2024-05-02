import { Prisma, type User } from "@prisma/client";
import _ from "lodash";
import { randomUUID } from "crypto";
import { SECURE_IMAGE_ENDPOINT, type UserWithOutPassword } from "@/app/_lib/definition";

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>], string>;

export function prismaExclude<T extends Entity, K extends Keys<T>>(type: T, omit: K[]) {
  type Key = Exclude<Keys<T>, K>;
  type TMap = Record<Key, true>;
  const result: TMap = {} as TMap;
  for (const key in Prisma[`${type}ScalarFieldEnum`]) {
    if (!omit.includes(key as K)) {
      result[key as Key] = true;
    }
  }
  return result;
}

export function createPaginationRange(currentPage: number, totalPage: number, siblings = 1) {
  const totalPageNoInArray = 7 + siblings;
  if (totalPageNoInArray >= totalPage) {
    return _.range(1, totalPage + 1);
  }
  const leftSiblingsIndex = Math.max(currentPage - siblings, 1);
  const rightSiblingsIndex = Math.min(currentPage + siblings, totalPage);

  const showLeftDots = leftSiblingsIndex > 2;
  const showRightDots = rightSiblingsIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    const leftItemsCount = 3 + 2 * siblings;
    const leftRange = _.range(1, leftItemsCount + 1);
    return [...leftRange, "...", totalPage];
  } else if (showLeftDots && !showRightDots) {
    const rightItemsCount = 3 + 2 * siblings;
    const rightRange = _.range(totalPage - rightItemsCount + 1, totalPage + 1);
    return [1, "...", ...rightRange];
  } else {
    const middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
    return [1, "...", ...middleRange, "...", totalPage];
  }
}

export const getValidPage = (page?: string | number) => {
  const number = Math.abs(Number(page));
  return isNaN(number) ? 1 : number;
};

export const getTotalPage = (total: number, limitPerPage: number) => {
  return Math.ceil(total / limitPerPage);
};

export const generateUUID = () => {
  const time = new Date().getTime();
  const uuid = randomUUID();
  return `${time}_${uuid}`;
};

export const usersImageAdaptor = (users: UserWithOutPassword[]) => {
  return users.map((user) => {
    if (user.image) {
      if (user.image.startsWith("http")) {
        return user;
      } else {
        return {
          ...user,
          image: `${SECURE_IMAGE_ENDPOINT}/${user.image}`,
        };
      }
    } else {
      return user;
    }
  });
};

export const userImageAdaptor = (user: UserWithOutPassword) => {
  if (user.image) {
    if (user.image.startsWith("http")) {
      return user;
    } else {
      return {
        ...user,
        image: `${SECURE_IMAGE_ENDPOINT}/${user.image}`,
      };
    }
  } else {
    return user;
  }
};

export const isValidThaiID = (idNumber: string): boolean => {
  // ตรวจสอบความยาวของเลขบัตรประชาชน
  if (idNumber.length !== 13) {
    return false;
  }

  // ตรวจสอบว่าเลขทั้งหมดเป็นตัวเลขหรือไม่
  if (!/^\d+$/.test(idNumber)) {
    return false;
  }

  // ตรวจสอบ Check Digit
  const checkDigit = parseInt(idNumber.charAt(12));
  const calculatedCheckDigit = calculateCheckDigit(idNumber.substr(0, 12));
  if (checkDigit !== calculatedCheckDigit) {
    return false;
  }

  return true;
};

// ฟังก์ชันสำหรับคำนวณ Check Digit
export const calculateCheckDigit = (idNumber: string): number => {
  const multipliers: number[] = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(idNumber[i]!) * multipliers[i]!;
  }
  const remainder = sum % 11;
  let checkDigit;
  if (remainder === 0) {
    checkDigit = 0;
  } else {
    checkDigit = 11 - remainder;
  }
  return checkDigit;
};

export const formatBytes = (bytes: string, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

  const i = Math.floor(Math.log(+bytes) / Math.log(k));

  return `${parseFloat((+bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
