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

export const usersImageAdaptor = (users: User[]) => {
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
