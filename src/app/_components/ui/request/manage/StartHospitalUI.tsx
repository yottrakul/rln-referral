import { Suspense, type FC } from "react";
import type { ReferralCase } from "@prisma/client";
import { Grid, GridItem, Flex, Stack, Heading, Spacer, Text } from "@chakra-ui/react";
import Chat from "@/app/_components/ui/chat/Chat";
import DisplayStatus from "./DisplayStatus";
import MedRecordWrapper from "./MedRecordWrapper";
import MedRecordProvider from "@/app/_components/context/MedicalRecordContext";

interface StartHospitalUIProps {
  caseData: ReferralCase;
}

const StartHospitalUI: FC<StartHospitalUIProps> = ({ caseData }) => {
  let headingMsg = "";
  let descriptionMsg = "";
  if (caseData.status === "REJECT") {
    headingMsg = "คำขอถูกปฏิเสธ";
    descriptionMsg = "กรุณาส่งคำขอใหม่อีกครั้ง";
  } else if (caseData.status === "PENDING") {
    headingMsg = "ส่งคำขอเสร็จสิ้น";
    descriptionMsg = "อยู่ระหว่างรอการตอบรับคำขอ";
  } else if (caseData.status === "ACCEPT") {
    headingMsg = "อนุมัติการรักษาเคส";
    descriptionMsg = "รอการจบการรักษาเคส";
  } else if (caseData.status === "COMPLETE") {
    headingMsg = "เคสเสร็จสิ้น";
    descriptionMsg = "เคสนี้เสร็จสิ้นแล้ว";
  }
  return (
    <Grid gap={4} gridTemplateColumns={{ base: "1fr", md: "repeat(2,1fr)" }}>
      <MedRecordProvider>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Flex>
            <Stack>
              <Heading
                color={
                  caseData.status === "REJECT" ? "red.500" : caseData.status === "ACCEPT" ? "green.600" : undefined
                }
                as={"h2"}
                size={"lg"}
              >
                {headingMsg}
              </Heading>
              <Text>{descriptionMsg}</Text>
            </Stack>
            <Spacer />
          </Flex>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Suspense fallback={<div>Loading...</div>}>
            <DisplayStatus caseId={caseData.id} />
          </Suspense>
        </GridItem>

        <GridItem>
          <Chat containerStyle={{ h: "100%" }} />
        </GridItem>

        <GridItem h={"30rem"}>
          <MedRecordWrapper caseId={caseData.id} />
        </GridItem>
      </MedRecordProvider>
    </Grid>
  );
};

export default StartHospitalUI;
