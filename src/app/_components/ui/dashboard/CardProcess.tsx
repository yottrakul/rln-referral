"use client";
// import { getAllProcessList } from "@/app/_actions/board/card";
import { type Status, type ReferralCase } from "@prisma/client";
import React, { useEffect } from "react";

interface CardProcessProp {
  status: Status;
}

export default function CardProcess({ status }: CardProcessProp) {
  const [numRefCase, setNumRefCase] = React.useState<number>();

  return (
    <div>
      {numRefCase?.toString()}
      {/* {JSON.stringify(referralCase)} */}
    </div>
  );
}
