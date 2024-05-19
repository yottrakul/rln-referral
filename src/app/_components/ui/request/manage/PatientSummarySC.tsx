import { getPatientById } from "@/app/_actions/refferral-case/patient";
import { getPatient } from "@/app/_actions/request";
import PatientSummary from "@/app/_components/ui/create-request/PatientSummary";
import { type FC } from "react";

interface PatientSummarySCProps {
  patientId: number;
}

const PatientSummarySC: FC<PatientSummarySCProps> = async ({ patientId }) => {
  const patient = await getPatientById(patientId);

  if (!patient) {
    return <div>ไม่พบข้อมูลผู้ป่วย...</div>;
  }

  return <PatientSummary patient={patient} />;
};

export default PatientSummarySC;
