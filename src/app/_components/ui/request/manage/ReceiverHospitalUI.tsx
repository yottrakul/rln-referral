import { Suspense, type FC } from "react";
import type { ReferralCase } from "@prisma/client";
import { Grid, GridItem, Flex, Stack, Heading, Spacer, Wrap, WrapItem, Text } from "@chakra-ui/react";
import Chat from "../../chat/Chat";
import DisplayStatus from "./DisplayStatus";
import HospitalReferInputWrapper from "./HospitalReferInputWrapper";
import MedRecordWrapper from "./MedRecordWrapper";
import ReceiverActions from "./ReceiverActions";
import PatientSummarySC from "./PatientSummarySC";
import ReceiverAcceptedAction from "./ReceiverAcceptedAction";

interface ReceiverHospitalUIProps {
  caseData: ReferralCase;
}

const ReceiverHospitalUI: FC<ReceiverHospitalUIProps> = ({ caseData }) => {
  let headingMsg = "";
  let descriptionMsg = "";
  if (caseData.status === "REJECT") {
    headingMsg = "คำขอถูกปฏิเสธ";
    descriptionMsg = "รอการตอบกลับจากโรงพยาบาลต้นทาง";
  } else if (caseData.status === "PENDING") {
    headingMsg = "ตอบรับการรักษาเคส";
    descriptionMsg = "ประวัติการรักษาเคสนี้ทั้งหมด";
  } else if (caseData.status === "ACCEPT") {
    headingMsg = "อนุมัติการรักษาเคส";
    descriptionMsg = "รอการจบการรักษาเคส";
  } else if (caseData.status === "COMPLETE") {
    headingMsg = "เคสเสร็จสิ้น";
    descriptionMsg = "เคสนี้เสร็จสิ้นแล้ว";
  }
  return (
    <Grid gap={4} gridTemplateColumns={{ base: "1fr", md: "repeat(2,1fr)" }}>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <Flex>
          <Stack>
            <Heading
              color={caseData.status === "REJECT" ? "red.500" : caseData.status === "ACCEPT" ? "green.600" : undefined}
              as={"h2"}
              size={"lg"}
            >
              {headingMsg}
            </Heading>
            <Text>{descriptionMsg}</Text>
          </Stack>
          <Spacer />
          {caseData.status === "REJECT" || caseData.status === "ACCEPT" ? (
            <ReceiverAcceptedAction caseId={caseData.id} />
          ) : caseData.status !== "COMPLETE" ? (
            <ReceiverActions caseId={caseData.id}>
              <HospitalReferInputWrapper />
            </ReceiverActions>
          ) : null}
        </Flex>
      </GridItem>

      <GridItem colSpan={{ base: 1, md: 2 }}>
        <Suspense fallback={<div>Loading Process...</div>}>
          <DisplayStatus caseId={caseData.id} />
        </Suspense>
      </GridItem>

      <GridItem colSpan={{ base: 1, md: 2 }}>
        <Suspense fallback={<div>Loading Patient data...</div>}>
          <PatientSummarySC patientId={caseData.patientId} />
        </Suspense>
      </GridItem>

      <GridItem>
        <Chat containerStyle={{ h: "100%" }} />
      </GridItem>

      <GridItem h={"30rem"}>
        <MedRecordWrapper caseId={caseData.id} />
      </GridItem>
    </Grid>
  );
};

export default ReceiverHospitalUI;
