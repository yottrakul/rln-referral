"use client";
import { Card, CardBody, CardHeader, Heading, SimpleGrid, Box, Text, Icon, Flex } from "@chakra-ui/react";
import { useCallback } from "react";
import { GENDER_NAME, patientSummaryHeaders, patientSummaryHeadersIcon } from "@/app/_lib/definition";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { type Patient } from "@/app/_schemas/generated/zod";
import ErrorHandleUI from "@/app/_components/ui/error/ErrorHandleUI";
import _, { isNull, isUndefined } from "lodash";

interface PatientSummaryProps {
  patient: Patient | null;
}

export default function PatientSummary({ patient }: PatientSummaryProps) {
  // const { data, isError, isLoading, isFetching } = useQuery({
  //   queryKey: ["patientSummary", citizenID],
  //   queryFn: async () => {
  //     const res = await getPatientByCitizenId(citizenID);
  //     if (res.success) {
  //       return res.data;
  //     }
  //     throw new Error(res.message.error);
  //   },
  //   staleTime: 0,
  // });

  const mainRender = useCallback(() => {
    if (isNull(patient)) {
      return <ErrorHandleUI />;
    } else {
      return _.map(patient, (value, key) => {
        let finalValue: string;
        const headerName = patientSummaryHeaders[key as keyof typeof patientSummaryHeaders];
        if (isUndefined(headerName)) return;

        if (isNull(value)) {
          finalValue = "-";
        } else {
          finalValue = value.toString();
        }

        if (key === "birthDate") {
          const age = new Date().getFullYear() - new Date(finalValue).getFullYear();
          finalValue = new Date(finalValue).toLocaleDateString("th-TH") + ` (${age} ปี)`;
        } else if (key === "gender") {
          finalValue = GENDER_NAME[finalValue as keyof typeof GENDER_NAME];
        }

        if (finalValue.length === 0) {
          finalValue = "-";
        }

        return (
          <Box key={key + finalValue}>
            <Flex gap={4}>
              <Icon
                as={
                  patientSummaryHeadersIcon[key as keyof typeof patientSummaryHeaders]?.icon ??
                  BsLayoutTextSidebarReverse
                }
                boxSize={6}
                color={patientSummaryHeadersIcon[key as keyof typeof patientSummaryHeaders]?.color}
              />
              <Box>
                <Heading size="sm" textTransform="uppercase">
                  {headerName}
                </Heading>
                <Text pt="2" fontSize="md">
                  {finalValue}
                </Text>
              </Box>
            </Flex>
          </Box>
        );
      });
    }
  }, [patient]);

  return (
    <Card variant={"solid"} overflow={"auto"}>
      <CardHeader pos={"sticky"} top={"0"} zIndex={10} bgColor={"white"}>
        <Heading size="md">ข้อมูลผู้ป่วย</Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid minChildWidth="250px" spacing={4}>
          {mainRender()}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}
