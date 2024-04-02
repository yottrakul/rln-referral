import React from "react";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";

export default function Card() {
  return (
    <Box>
      <Box>
        <Text textColor={"black"} fontSize={"3xl"} fontWeight={"Bold"}>
          Overview
        </Text>
      </Box>
      <HStack my={4} gap={4}>
        <Box w={"full"} shadow={"lg"} rounded={"xl"}>
          <Flex roundedTop={"xl"} bgColor={"#9E57DA"} p={4} gap={3}>
            <Box borderColor={"white"} border={"sm"} color={"white"}>
              <Text fontSize={"xl"} fontWeight={"bold"} color={"white"}>
                1
              </Text>
            </Box>
            <Text fontSize={"xl"} fontWeight={"bold"} color={"white"}>
              ส่งต่อผู้ป่วย
            </Text>
          </Flex>
          <Flex roundedBottom={"xl"} bgColor={"#fff"} p={4} gap={3} borderBottom={1} mb={2} borderColor={"gray"}>
            <Box borderColor={"white"} border={"sm"} color={"white"}>
              <Text fontSize={"lg"} fontWeight={"bold"} color={"black"}>
                7
              </Text>
            </Box>
            <Text fontSize={"lg"} color={"black"}>
              รายการ
            </Text>
          </Flex>
          <Flex
            borderTop={"2px"}
            justifyContent={"space-between"}
            roundedBottom={"xl"}
            bgColor={"#fff"}
            m={4}
            py={4}
            gap={3}
            mb={2}
            borderTopColor={"gray.400"}
          >
            <Text fontSize={"lg"} color={"gray"}>
              อัพเดทล่าสุด
            </Text>
            <Text fontSize={"lg"} color={"gray"}>
              3/8/2020
            </Text>
          </Flex>
        </Box>
      </HStack>
    </Box>
  );
}
