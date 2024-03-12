"use client";
import { useState, useEffect } from "react";
import ReactTable from "@/app/_components/ui/table/ReactTable";
import { userColumn } from "@/app/_components/ui/user/table/columns";
import { type User } from "@/app/_schemas/generated/zod";

interface UserManagementTableProps {
  data: User[];
}

export default function UserManagementTable({ data }: UserManagementTableProps) {
  const [userSeleted, setUserSelected] = useState<User[]>([]);

  useEffect(() => {
    console.log(userSeleted);
  }, [userSeleted]);

  return (
    <>
      <ReactTable data={data} columns={userColumn} onRowSelectStateChange={setUserSelected} />
    </>
  );
}
