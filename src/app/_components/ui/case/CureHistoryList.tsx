"use client";

import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Flex, VStack, Text, Spacer, Button } from "@chakra-ui/react";

interface CureHistoryListProp {
  doctor: string;
  hospital: string;
  create_date: string;
}

export default function CureHistoryList({ doctor, hospital, create_date }: CureHistoryListProp) {
  return (
    <VStack w={"full"} alignItems={"flex-start"} mt={3}>
      <Flex justify={"space-between"} alignItems={"center"} w={"full"}>
        <Text fontSize={"lg"}>ประวัติการรักษาและส่งต่อผู้ป่วย</Text>
        <Spacer />
        <Button leftIcon={<InfoOutlineIcon />} variant="outline" colorScheme="twitter">
          ดูรายละเอียด
        </Button>
      </Flex>
      <VStack alignItems={"flex-start"} pl={8}>
        <Text fontSize={"lg"}>{doctor}</Text>
        <Text fontSize={"lg"}>{hospital}</Text>
        <Text fontSize={"lg"}>{create_date}</Text>
      </VStack>
    </VStack>
  );
}
