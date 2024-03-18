"use client";
import { Select } from "@chakra-ui/react";
import { type Role } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

const roleCustomName: Record<Role, string> = {
  ADMIN: "ผู้ดูแลระบบ",
  PHYSICIAN: "แพทย์",
  MEDICAL_ASSISTANT: "ผู้ช่วยแพทย์",
  GUEST: "ผู้ใช้ทั่วไป",
};

export default function RoleFilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newSearchParams.set("role", e.target.value);
    } else {
      newSearchParams.delete("role");
    }
    router.replace(`?${newSearchParams.toString()}`);
  };
  return (
    <Select defaultValue={searchParams.get("role")?.toUpperCase()} onChange={handleSelect} flex={1}>
      <option value="">ทั้งหมด</option>
      {Object.keys(roleCustomName).map((role) => {
        return (
          <option key={role} value={role}>
            {roleCustomName[role as Role]}
          </option>
        );
      })}
    </Select>
  );
}
