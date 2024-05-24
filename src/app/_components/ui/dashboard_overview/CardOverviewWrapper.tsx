import { getAllProcessList } from "@/app/_actions/refferral-case";
import CardOverview from "./CardOverview";

const CardOverviewWrapper = async () => {
  const pendingCase = getAllProcessList("PENDING");
  const acceptCase = getAllProcessList("ACCEPT");
  const rejectCase = getAllProcessList("REJECT");
  const completeCase = getAllProcessList("COMPLETE");

  //delay 3s
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const [a, b, c, d] = await Promise.all([pendingCase, acceptCase, rejectCase, completeCase]);

  return (
    <>
      <CardOverview title="ส่งต่อผู้ป่วย" date="3/8/2020" bgcolor="#9E57DA" amount={a?.length} />
      <CardOverview title="รับผู้ป่วยใหม่" date="3/8/2020" bgcolor="#56BEC9" amount={b?.length} />
      <CardOverview title="คำขอถูกปฏิเสธ" date="3/8/2020" bgcolor="#E5483E" amount={c?.length} />
      <CardOverview title="คำขอผ่านการอนุมัติ" date="3/8/2020" bgcolor="#09B006" amount={d?.length} />
    </>
  );
};

export default CardOverviewWrapper;
