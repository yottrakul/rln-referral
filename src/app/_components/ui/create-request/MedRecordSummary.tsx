"use client";
// import MedRecord from "@/app/_components/ui/create-request/MedRecord";
import { BsThreeDots } from "react-icons/bs";
import {
  Card,
  CardHeader,
  Heading,
  Icon,
  CardBody,
  VStack,
  Box,
  type SystemStyleObject,
  Button,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { type Hospital } from "@/app/_schemas/generated/zod";
import ModalMedRecordCreate from "@/app/_components/ui/create-request/ModalMedRecordCreate";
import FileUploadProvider from "@/app/_components/context/FileUploadContext";
import { useMedicalContext } from "../../context/MedicalRecordContext";
import MedRecordCard from "./MedRecordCard";
import { useQuery } from "@tanstack/react-query";
import { getMedicalRecords } from "@/app/_actions/create-request/actions";
import { isUndefined } from "lodash";
import { GoInbox } from "react-icons/go";

interface MedRecordSummaryProps {
  containerStyle?: SystemStyleObject;
  hospitals: Hospital[];
  referralId?: string;
}

export default function MedRecordSummary({ containerStyle, hospitals, referralId }: MedRecordSummaryProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { medicalRecords: localMedRec, deleteMedicalRecord } = useMedicalContext();
  const {
    data: remoteMedRec,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["medRecords", referralId],
    queryFn: async () => {
      const res = await getMedicalRecords(referralId);
      return res;
    },
    staleTime: 0,
    enabled: isUndefined(referralId) ? false : true,
  });
  //   console.log(errors);
  // }, [errors]);

  return (
    <>
      <Card sx={{ ...containerStyle }} overflow={"auto"} variant={"solid"}>
        <CardHeader pos={"sticky"} top={"0"} zIndex={10} bgColor={"white"}>
          <Heading size="md">ประวัติการรักษา</Heading>
          <Box
            display={"flex"}
            padding={`var(--card-padding)`}
            justifyContent={"end"}
            alignItems={"center"}
            position={"absolute"}
            inset={0}
          >
            {localMedRec.length > 0 ? null : (
              <Button onClick={onOpen} colorScheme={"purple"}>
                เพิ่มประวัติการรักษา
              </Button>
            )}
          </Box>
        </CardHeader>
        <CardBody>
          {/* <MedRecord /> */}
          <VStack alignItems={"stretch"} maxW={"lg"} marginInline={"auto"}>
            {/* {Array.from({ length: 1 }).map((_, index) => {
              return <MedRecordCard isPreview key={index} />;
            })} */}
            <Box>
              <Icon as={GoInbox} boxSize={16} color={"purple.500"} />
            </Box>
            {localMedRec.map((medRec, index) => {
              return (
                <MedRecordCard
                  key={index}
                  medicalData={medRec}
                  isPreview={true}
                  onDownload={() => console.log("Download PDF")}
                  onViewDetail={() => console.log("OnView")}
                  onRemove={() => deleteMedicalRecord(medRec.id)}
                />
              );
            })}
            {isError && <Box>เกิดข้อผิดพลาดในการโหลดข้อมูล</Box>}
            {isFetching || (isLoading && <Box>กำลังโหลดข้อมูล...</Box>)}
            {remoteMedRec?.map((medRec, index) => {
              return (
                <MedRecordCard
                  key={index}
                  remoteMedicData={medRec}
                  isPreview={false}
                  onDownload={() => console.log("Download PDF")}
                  onViewDetail={() => console.log("OnView")}
                  onRemove={() => console.log("OnRemove")}
                />
              );
            })}
          </VStack>
        </CardBody>
      </Card>
      <FileUploadProvider>
        <ModalMedRecordCreate hospitals={hospitals} isOpen={isOpen} onClose={onClose} />
      </FileUploadProvider>
    </>
  );
}
