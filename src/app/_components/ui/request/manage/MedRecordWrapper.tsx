import MedRecordSummary from "@/app/_components/ui/create-request/MedRecordSummary";

import type { FC } from "react";
import { getHospitalAll } from "@/app/_actions/back_office";
import { checkCaseIs } from "@/app/_actions/refferral-case/check-case-status";

interface MedRecordWrapperProps {
  caseId: string;
  isReceiver?: boolean;
}

const MedRecordWrapper: FC<MedRecordWrapperProps> = async ({ caseId, isReceiver }) => {
  // check case is accept?
  const caseIsAccept = isReceiver && (await checkCaseIs(caseId, "ACCEPT"));
  const hospitals = caseIsAccept ? await getHospitalAll() : undefined;
  return (
    <>
      <MedRecordSummary
        hospitals={hospitals}
        containerStyle={{ h: "100%" }}
        referralId={caseId}
        patientId={null}
        mode="CASEID"
      />
    </>
  );
};

export default MedRecordWrapper;
