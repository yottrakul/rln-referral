"use client";
import { Card, CardBody, Heading, Box, SimpleGrid, Text, Icon, Button } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { getPatient, getHospital } from "@/app/_actions/request";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Props {
  patientId: number;
  senderhospital: number;
  receiverhospital: number;
  status: string;
}
interface typePatient {
  id: number;
  citizenId: string;
  patientFirstname: string;
  patientSurname: string;
  phone: string | null;
  birthDate: Date;
  gender: string;
  bloodType: string;
  postalCode: string | null;
}
interface typeHospital {
  id: number;
  hospitalName: string;
}

export default function CardData({ patientId, senderhospital, receiverhospital, status }: Props) {
  const searchParams = useSearchParams();
  const [isPatient, setPatient] = useState<typePatient>();
  const [isHospital, setHospital] = useState<typeHospital | null>();

  useEffect(() => {
    const loadPatient = async () => {
      const res = await getPatient(patientId);
      if (res) {
        setPatient(res);
      }
      const res1 = await getHospital(
        searchParams.get("senrec") == "1" || !searchParams.get("senrec") ? receiverhospital : senderhospital
      );
      if (res) {
        setHospital(res1);
      }
    };

    loadPatient().catch((error) => {
      console.log(error);
    });
  }, [patientId, senderhospital, receiverhospital, searchParams]);

  return (
    <>
      <Card display={isHospital ? "block" : "none"} className="card">
        <CardBody px={6}>
          <Heading as="h6" style={{ fontSize: "25px" }}>
            ข้อมูลผู้ป่วย
          </Heading>

          <Box mt={4}>
            <SimpleGrid columns={2} spacing={2}>
              <Text as="b">ชื่อ</Text>
              <Text as="b">นามสกุล</Text>
              <Text>{isPatient?.patientFirstname}</Text>
              <Text>{isPatient?.patientSurname}</Text>
              <Text as="b">เพศ</Text>
              <Text as="b">อายุ</Text>
              <Text>{isPatient?.gender == "MALE" ? "ชาย" : isPatient?.gender == "FEMALE" ? "หญิง" : "ไม่ระบุ"}</Text>
              <Text>{new Date().getFullYear() - (isPatient?.birthDate.getFullYear() ?? 0)}</Text>
              <Text as="b">{searchParams.get("senrec") == "1" ? "โรงพยาบาลปลายทาง" : "โรงพยาบาลต้นทาง"}</Text>
              <Text as="b">สถานะ</Text>
              <Text>{isHospital?.hospitalName}</Text>
              <Text>{status}</Text>
            </SimpleGrid>
          </Box>

          <Button colorScheme={"linkedin"} mt={4} w={"100%"} variant="outline" size={"sm"}>
            <Icon as={InfoOutlineIcon} mr={3} />
            ดูรายละเอียด
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
