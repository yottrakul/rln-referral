import { Box, HStack } from "@chakra-ui/react";
import AddUserButton from "@/app/_components/ui/back_office/AddUserButton";
import { getHospitalAll } from "@/app/_actions/back_office";
import DeleteUseButton from "@/app/_components/ui/back_office/DeleteUseButton";

export default async function UserAction() {
  const hospitals = await getHospitalAll();
  return (
    <Box marginInlineStart={"auto"}>
      <HStack>
        <DeleteUseButton />
        <AddUserButton hospitals={hospitals} />
      </HStack>
    </Box>
  );
}
