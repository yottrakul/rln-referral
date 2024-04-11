"use client";
import { getAllProcessList } from "@/app/_actions/board/card";
import { type Status, type ReferralCase } from "@prisma/client";
import React, { useEffect } from "react";

interface CardProcessProp {
  status: Status;
}

export default function CardProcess({ status }: CardProcessProp) {
  const [numRefCase, setNumRefCase] = React.useState<number>();

  useEffect(() => {
    const handleStatus = async () => {
      const referralCase = await getAllProcessList(status);
      if (referralCase) {
        setNumRefCase(referralCase.length);
      }
    };
    handleStatus().catch(console.error);
  }, [status]);

  return (
    <div>
      {numRefCase?.toString()}
      {/* {JSON.stringify(referralCase)} */}
    </div>
  );
}
