"use client";
import MedRecordSummary from "@/app/_components/ui/create-request/MedRecordSummary";
import MedRecordProvider from "@/app/_components/context/MedicalRecordContext";

import type { FC } from "react";

interface MedRecordWrapperProps {
  caseId: string;
}

const MedRecordWrapper: FC<MedRecordWrapperProps> = ({ caseId }) => {
  return (
    <>
      <MedRecordProvider>
        <MedRecordSummary containerStyle={{ h: "100%" }} referralId={caseId} />
      </MedRecordProvider>
    </>
  );
};

export default MedRecordWrapper;
