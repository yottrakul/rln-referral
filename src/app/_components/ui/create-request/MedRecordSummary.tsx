"use client";
// import MedRecord from "@/app/_components/ui/create-request/MedRecord";
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
  Text,
} from "@chakra-ui/react";
import { type Hospital } from "@/app/_schemas/generated/zod";
import ModalMedRecordCreate from "@/app/_components/ui/create-request/ModalMedRecordCreate";
import FileUploadProvider from "@/app/_components/context/FileUploadContext";
import { useMedicalContext } from "../../context/MedicalRecordContext";
import MedRecordCard from "@/app/_components/ui/create-request/MedRecordCard";
import { useQuery } from "@tanstack/react-query";
import { getMedicalRecords } from "@/app/_actions/create-request/actions";
import { isNull, isUndefined } from "lodash";
import { GoInbox } from "react-icons/go";
import ModalMedRecordDetail from "./ModalMedRecordDetail";
import { useState } from "react";

interface MedRecordSummaryProps {
  containerStyle?: SystemStyleObject;
  hospitals?: Hospital[];
  referralId?: string | null;
}

export default function MedRecordSummary({ containerStyle, hospitals, referralId }: MedRecordSummaryProps) {
  // console.log(isUndefined(hospitals));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalDetailController = useDisclosure();
  const { medicalRecords: localMedRec, deleteMedicalRecord } = useMedicalContext();
  const [patientDetail, setPatientDetail] = useState<string | null>(null);
  const {
    data: remoteMedRec,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["medRecords", referralId],
    queryFn: async () => {
      const res = await getMedicalRecords(referralId!);
      return res;
    },
    staleTime: 0,
    enabled: isUndefined(referralId) || isNull(referralId) ? false : true,
  });

  const medIsEmpty = localMedRec.length === 0 && (isUndefined(remoteMedRec) || remoteMedRec.length === 0);

  const handleMedRecordDetail = (data: string) => {
    setPatientDetail(data);
    modalDetailController.onOpen();
  };

  const handleMedRecordDownload = (data: string) => {
    if (data) {
      window.open(`/api/secureimg/${data}`, "_blank");
    }
  };

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
            {isUndefined(hospitals) ? null : localMedRec.length > 0 ? null : (
              <Button onClick={onOpen} colorScheme={"purple"}>
                เพิ่มประวัติการรักษา
              </Button>
            )}
          </Box>
        </CardHeader>
        <CardBody display={medIsEmpty ? "grid" : "block"}>
          <VStack alignItems={"stretch"} maxW={"lg"} marginInline={"auto"}>
            {medIsEmpty ? (
              <Center minH={"full"}>
                <Box textAlign={"center"}>
                  <Icon as={GoInbox} boxSize={16} color={"purple.500"} />
                  <Text>ไม่พบประวัติการรักษา</Text>
                </Box>
              </Center>
            ) : null}

            {localMedRec.map((medRec, index) => {
              return (
                <MedRecordCard
                  key={index}
                  medicalData={medRec}
                  isPreview={true}
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
                  onDownload={handleMedRecordDownload}
                  onViewDetail={handleMedRecordDetail}
                />
              );
            })}
          </VStack>
        </CardBody>
      </Card>
      {hospitals && (
        <FileUploadProvider>
          <ModalMedRecordCreate hospitals={hospitals} isOpen={isOpen} onClose={onClose} />
        </FileUploadProvider>
      )}

      <ModalMedRecordDetail
        patientDetail={patientDetail ?? "ไม่พบข้อมูล"}
        isOpen={modalDetailController.isOpen}
        onClose={modalDetailController.onClose}
      />
    </>
  );
}
