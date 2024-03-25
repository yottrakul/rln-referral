"use client";
import { useState, useEffect } from "react";
import ReactTable from "@/app/_components/ui/table/ReactTable";
import { userColumn } from "@/app/_components/ui/user/table/columns";
import { type UserWithOutPassword } from "@/app/_lib/definition";
import { useUserContext } from "@/app/_components/context/UserManagementContext";

interface UserManagementTableProps {
  data: UserWithOutPassword[];
}

export default function UserManagementTable({ data }: UserManagementTableProps) {
  const [userSeleted, setUserSelected] = useState<UserWithOutPassword[]>([]);

  const { user, setUserData } = useUserContext();

  useEffect(() => {
    setUserData(userSeleted);
  }, [userSeleted]);

  console.log("🚀 ~ UserManagementTable ~ user:", user);

  return (
    <>
      <ReactTable w={"full"} data={data} columns={userColumn} onRowSelectStateChange={setUserSelected} />
    </>
  );
}
