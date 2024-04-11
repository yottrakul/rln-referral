"use client";

interface MedRecordSummaryProps {
  medicalComp?: React.ReactNode;
  hospitalComp?: React.ReactNode;
}

export default function MedRecordSummary({ medicalComp, hospitalComp }: MedRecordSummaryProps) {
  return (
    <div>
      {medicalComp}
      {hospitalComp}
      <div>ประวัติการรักษา</div>
      <div>ฟอร์มเลือกโรงบาล</div>
    </div>
  );
}
