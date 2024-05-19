"use client";
import { type Status } from "@prisma/client";
import React, { useEffect } from "react";
import { getAllProcessList } from "@/app/_actions/refferral-case";

interface CardProcessProp {
  status: Status;
}

export default function CardProcess({ status }: CardProcessProp) {
  const [numRefCase, setNumRefCase] = React.useState<number>(0);
  const [isError, setIsError] = React.useState<boolean>(false);

  useEffect(() => {
    const handleStatus = async () => {
      setIsError(false);
      const referralCase = await getAllProcessList(status);
      if (referralCase) {
        setNumRefCase(referralCase.length);
      }
    };
    handleStatus().catch(() => setIsError(true));
  }, [status]);

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {numRefCase?.toString()}
      {/* {JSON.stringify(referralCase)} */}
    </>
  );
}
