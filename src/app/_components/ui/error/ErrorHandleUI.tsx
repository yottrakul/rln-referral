import { Center, Icon, VStack, Text } from "@chakra-ui/react";
import { BiSolidError } from "react-icons/bi";

interface ErrorHandleUIProps {
  msg?: string;
}

export default function ErrorHandleUI({ msg }: ErrorHandleUIProps) {
  return (
    <Center>
      <VStack>
        <Icon as={BiSolidError} boxSize={10} color={"red.400"} />
        <Text>{msg ? msg : "เกิดข้อผิดพลาด"}</Text>
      </VStack>
    </Center>
  );
}
