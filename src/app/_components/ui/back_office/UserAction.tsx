import { Box, Button, HStack } from "@chakra-ui/react";
import AddUserButton from "./AddUserButton";
import { getHospitalAll } from "@/app/_actions/back_office";

export default async function UserAction() {
  const hospitals = await getHospitalAll();
  return (
    <Box marginInlineStart={"auto"}>
      <HStack>
        <Button colorScheme="red">ลบ</Button>
        <AddUserButton hospitals={hospitals} />
      </HStack>
    </Box>
  );
}
