"use client";
import { getPatientByCitizenId } from "@/app/_actions/create-request/actions";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  StackDivider,
  Box,
  Text,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { GENDER_NAME, patientSummaryHeaders } from "@/app/_lib/definition";

interface PatientSummaryProps {
  citizenID: string;
}

export default function PatientSummary({ citizenID }: PatientSummaryProps) {
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["patientSummary", citizenID],
    queryFn: async () => {
      const res = await getPatientByCitizenId(citizenID);
      if (res.success) {
        return res.data;
      }
      throw new Error(res.message.error);
    },
    staleTime: 0,
  });

  const mainRender = useCallback(() => {
    if (isLoading || isFetching) {
      return Array.from({ length: 6 }).map((_, index) => {
        return (
          <Stack key={index}>
            <Skeleton height="20px" w={"30%"} />
            <Skeleton height="20px" />
          </Stack>
        );
      });
    } else if (isError) {
      return <Text textColor="red.400">เกิดข้อผิดพลาด</Text>;
    } else {
      if (data) {
        return Object.entries(data).map(([key, value]: [string, string | Date]) => {
          let finalValue: string;
          const headerName = patientSummaryHeaders[key as keyof typeof patientSummaryHeaders];
          if (key === "birthDate") {
            const age = new Date().getFullYear() - new Date(value).getFullYear();
            finalValue = new Date(value).toLocaleDateString("th-TH") + ` (${age} ปี)`;
          } else if (key === "gender") {
            finalValue = GENDER_NAME[value as keyof typeof GENDER_NAME];
          } else {
            finalValue = value.toString();
            if (finalValue.length === 0) {
              finalValue = "-";
            }
          }
          return (
            <Box key={key + value.toString()}>
              <Heading size="sm" textTransform="uppercase">
                {headerName}
              </Heading>
              <Text pt="2" fontSize="md">
                {finalValue}
              </Text>
            </Box>
          );
        });
      }
    }
  }, [isLoading, isFetching, isError, data]);

  return (
    <Card
      sx={{
        borderTop: "0.5rem solid",
        borderColor: "purple.500",
      }}
    >
      <CardHeader
        sx={{
          borderBottom: "1px solid",
          borderColor: "gray.200",
        }}
      >
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
