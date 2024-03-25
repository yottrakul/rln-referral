"use client";
import { type UserWithOutPassword } from "@/app/_lib/definition";
import { Avatar, Badge, Box, Text, HStack, Button } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { FaGear } from "react-icons/fa6";
import DataTableColumnHeader from "@/app/_components/ui/table/DataTableColumnHeader";
import CheckboxWithIndeterminate from "@/app/_components/ui/table/CheckboxWithIndeterminate";
import CheckboxTable from "@/app/_components/ui/table/Checkbox";
import Link from "next/link";
import ModifyRoleButton from "@/app/_components/ui/back_office/ModifyRoleButton";

// Create Column Helper for User
const columnHelper = createColumnHelper<UserWithOutPassword>();

// Roles Badge Color
export const roleColor = {
  ADMIN: "red",
  MEDICAL_ASSISTANT: "green",
  PHYSICIAN: "blue",
  GUEST: "gray",
};

// Make Column

/**
 * How to use createColumnHelper
 * columnHelper.accessor ==> ใช้สำหรับข้อมูลที่สามารถเรียงลำดับได้ เช่น ชื่อ นามสกุล อายุ ตัวเลขต่างๆ
 * columnHelper.display ==> ใช้สำหรับข้อมูลที่ไม่สามารถเรียงลำดับได้ เช่น ปุ่มแก้ไข ปุ่มลบ
 * {
 *  id -> ส่วนใหญ่ใส่เฉพาะกับ display,
 *  header -> ส่วนของหัวตาราง แนะนำให้ import DataTableColumnHeader ที่เขียนไว้แล้ว ใน src/app/_components/ui/table/DataTableColumnHeader.tsx,
 * cell -> ส่วนของเซลล์ตาราง สามารถใส่เป็น element หรือ function ก็ได้ หากต้องการดึงข้อมูลจาก row ให้ใช้ row.getValue() หรือ row.original.VALUEต้องการ ก็ได้เหมือนกัน
 * }
 */

// TODO 1: อย่าลืมใส่ data-cell ให้ทุกๆ cell ด้วย โดยใส่ชื่อ column ที่เป็น key ของ column นั้นๆ และแปะไว้ข้างนอกสุดของ element ที่ใช้แสดงข้อมูล โดย data-cell จะช่วยให้้ label ของเซลล์ตารางเป็นชื่อ column นั้นๆใน หน้าจอขนาดเล็ก (Mobile)

export const userColumn = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => <CheckboxWithIndeterminate table={table} />,
    cell: ({ row }) => (
      <Box data-cell="Select">
        <CheckboxTable row={row} />
      </Box>
    ),
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Users"} />,
    cell: ({ row }) => (
      <Box data-cell="Users">
        <HStack>
          <Avatar size="sm" name={row.original.name ?? ""} src={row.original.image ?? ""} />
          <Box>
            <Text>{row.original.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {row.getValue("email")}
            </Text>
          </Box>
        </HStack>
      </Box>
    ),
  }),
  columnHelper.accessor("role", {
    header: ({ column }) => <DataTableColumnHeader column={column} title={"User Role"} />,
    cell: ({ row }) => (
      <span data-cell="User Role">
        <Badge colorScheme={roleColor[row.getValue("role") as keyof typeof roleColor]} variant="solid">
          {`${row.original.role}`}
        </Badge>
      </span>
    ),
  }),
  columnHelper.display({
    id: "user_action",
    header: () => <div></div>,
    cell: ({ row }) => <ModifyRoleButton id={row.original.id} />,
  }),
];
