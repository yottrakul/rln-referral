"use client";
import { useState } from "react";
import ReactTable from "@/app/_components/ui/table/ReactTable";
import { userColumn } from "@/app/_components/ui/back_office/user/table/columns";
import { type UserWithOutPassword } from "@/app/_lib/definition";

interface UserManagementTableProps {
  data: UserWithOutPassword[];
}

export default function UserManagementTable({ data }: UserManagementTableProps) {
  const [userSeleted, setUserSelected] = useState<UserWithOutPassword[]>([]);

  // useEffect(() => {
  //   console.log(userSeleted);
  // }, [userSeleted]);

  return (
    <>
      <ReactTable w={"full"} data={data} columns={userColumn} onRowSelectStateChange={setUserSelected} />
    </>
  );
}