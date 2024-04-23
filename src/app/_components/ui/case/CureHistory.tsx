import { Divider, Flex, Text, VStack } from "@chakra-ui/react";
import CureHistoryList from "@/app/_components/ui/case/CureHistoryList";
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

export default async function CureHistory() {
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
