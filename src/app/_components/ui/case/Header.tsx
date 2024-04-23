"use client";

import { Flex, Text, Badge, HStack, VStack, Spacer } from "@chakra-ui/react";
import Cancel_case from "@/app/_components/ui/case/Cancel_case";

export default function Header() {
  const case_id = { id: "CA36453" };

  return (
    <Flex>
      <VStack spacing={0} alignItems={"start"} w={"full"}>
        <Flex justifyItems={"space-between"} w={"full"}>
          <HStack>
            <Text fontSize={"2xl"}>Case ID: {case_id.id}</Text>
            <Badge
              variant="solid"
              fontSize={"lg"}
              fontWeight={"medium"}
              boxShadow={"lg"}
              rounded={"md"}
              colorScheme="green"
            >
              Complete
            </Badge>
          </HStack>
          <Spacer />
          <Flex alignItems={"center"}>
            <Cancel_case />
          </Flex>
        </Flex>
        <HStack>
          <Text fontSize={"lg"} color={"gray.500"}>
            Case ID: {case_id.id}
          </Text>
        </HStack>
      </VStack>
    </Flex>
  );
}
