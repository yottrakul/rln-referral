"use client";

import { Flex, Text, Box, VStack } from "@chakra-ui/react";
import DisplayStepper from "@/app/_components/ui/status/DisplayStepper";

export default function Status() {
  return (
    <Flex bg={"white"} shadow={"xl"} rounded={"lg"} p={4}>
      <VStack w="full">
        <Box borderBottomWidth={2} borderColor="gray.200" w="full">
          <Text fontSize={"2xl"} pb={2} as={"b"}>
            สถานะส่งตัวผู้ป่วย
          </Text>
        </Box>
        <Box w="full">
          <DisplayStepper />
        </Box>
      </VStack>
    </Flex>
  );
}
