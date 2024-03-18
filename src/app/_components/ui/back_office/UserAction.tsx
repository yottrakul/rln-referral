import { Box, Button, HStack } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

export default function UserAction() {
  return (
    <Box marginInlineStart={"auto"}>
      <HStack>
        <Button colorScheme="red">ลบ</Button>
        <Button colorScheme="teal" rightIcon={<FaPlus />}>
          เพิ่มผู้ใช้งาน
        </Button>
      </HStack>
    </Box>
  );
}
