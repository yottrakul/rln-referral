import { getServerAuthSession } from "@/server/auth";
import { type FC } from "react";
import type { ReferralCase } from "@prisma/client";
import ReceiverHospitalUI from "./ReceiverHospitalUI";
import SenderHospitalUI from "./SenderHospitalUI";
import StartHospitalUI from "./StartHospitalUI";

interface RequestManageProps {
  caseData: ReferralCase;
}

const RequestManage: FC<RequestManageProps> = async ({ caseData }) => {
  const currUser = await getServerAuthSession();

  if (currUser === null) {
    return <div>ไม่พบข้อมูลผู้ใช้งาน</div>;
  }

  // รพไม่เกี่ยวข้องกับ request ใดๆ
  const hospitalID = currUser.user.hospitalId;
  if (hospitalID) {
    // check if hospital is related to the request
    if (
      caseData.receiverHospital !== hospitalID &&
      caseData.senderHospital !== hospitalID &&
      caseData.startHospital !== hospitalID
    ) {
      return <div>ไม่สามารถดำเนินการเรื่องนี้ได้</div>;
    }
  } else {
    return <div>ไม่พบข้อมูลโรงพยาบาล</div>;
  }

  // ส่งไปยัง 3 UI ต่างๆ SenderHospitalUI, ReceiverHospitalUI, StartHospitalUI

  if (caseData.senderHospital === hospitalID) {
    return <SenderHospitalUI caseData={caseData} />;
  }

  if (caseData.receiverHospital === hospitalID) {
    return <ReceiverHospitalUI caseData={caseData} />;
  }

  if (caseData.startHospital === hospitalID) {
    return <StartHospitalUI caseData={caseData} />;
  }

  return <div>RequestManage</div>;
};

export default RequestManage;
