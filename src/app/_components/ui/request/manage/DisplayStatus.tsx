import type { FC } from "react";
import DisplayStepper from "@/app/_components/ui/status/DisplayStepper";
import { getCaseProgress } from "@/app/_actions/request/actions";

interface DisplayStatusProps {
  caseId: string;
}

const DisplayStatus: FC<DisplayStatusProps> = async ({ caseId }) => {
  const { steps, currentStep } = await getCaseProgress(caseId);
  return (
    <div>
      <DisplayStepper steps={steps} activeStep={currentStep} />
    </div>
  );
};

export default DisplayStatus;
