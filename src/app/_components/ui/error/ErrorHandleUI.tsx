import { Center, Icon, VStack, Text } from "@chakra-ui/react";
import { BiSolidError } from "react-icons/bi";

export default function ErrorHandleUI() {
  return (
    <Center>
      <VStack>
        <Icon as={BiSolidError} boxSize={10} color={"red.400"} />
        <Text>เกิดข้อผิดพลาด</Text>
      </VStack>
    </Center>
  );
}
