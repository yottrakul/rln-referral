"use client";
import { Divider, Flex, Text, VStack } from "@chakra-ui/react";
import CureHistoryList from "@/app/_components/ui/case/CureHistoryList";
import { useEffect, useState } from "react";
import { getMedRecord } from "@/app/_actions/case";
import { useSearchParams } from "next/navigation";
import { type MedRecordType } from "@/app/_lib/definition";
const cureList = [
  {
    doctor: "นายแพทย์ชุมพร ชุมพร",
    hospital: "โรงพยาบาล A",
    create_date: "02/01/1996",
    id: 1,
  },
  {
    doctor: "นายแพทย์ชุมพร ชุมพร",
    hospital: "โรงพยาบาล A",
    create_date: "02/01/1996",
    id: 2,
  },
  {
    doctor: "นายแพทย์ชุมพร ชุมพร",
    hospital: "โรงพยาบาล A",
    create_date: "02/01/1996",
    id: 3,
  },
];

export default function CureHistory() {
  const params = useSearchParams();
  const [data, setData] = useState<MedRecordType>([]);
  console.log(params);
  useEffect(() => {
    const handleFetch = async () => {
      const _id = params.get("id");
      console.log(_id);
      if (_id === null) return console.log("id is null");
      const res = await getMedRecord(_id);
      setData(res);
    };

    handleFetch().catch((e) => console.error(e));
  }, [params]);
  return (
    <Flex shadow={"lg"} mt={10} w={"full"} p={4} rounded={"lg"} px={4}>
      <VStack w={"full"} alignItems={"flex-start"}>
        <Text fontSize={"xl"} fontWeight={"medium"}>
          ประวัติการรักษา
        </Text>
        <Divider />
        {cureList.map((e) => {
          return <CureHistoryList key={e.id} doctor={e.doctor} hospital={e.hospital} create_date={e.create_date} />;
        })}
      </VStack>
    </Flex>
  );
}
