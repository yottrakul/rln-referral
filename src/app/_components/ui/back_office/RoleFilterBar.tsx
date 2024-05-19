"use client";
import { Select } from "@chakra-ui/react";
import { type Role } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { ROLE_NAME } from "@/app/_lib/definition";

export default function RoleFilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newSearchParams.set("role", e.target.value);
      newSearchParams.set("page", "1");
    } else {
      newSearchParams.delete("role");
    }
    router.replace(`?${newSearchParams.toString()}`);
  };
  return (
    <Select defaultValue={searchParams.get("role")?.toUpperCase()} onChange={handleSelect} flex={1}>
      <option value="">ทั้งหมด</option>
      {Object.keys(ROLE_NAME).map((role) => {
        return (
          <option key={role} value={role}>
            {ROLE_NAME[role as Role]}
          </option>
        );
      })}
    </Select>
  );
}
