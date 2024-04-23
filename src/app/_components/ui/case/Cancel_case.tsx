import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

export default function Cancel_case() {
  return (
    <Button rightIcon={<DeleteIcon color={"white"} />} colorScheme={"red"} rounded={"xl"} size={"sm"}>
      Cancel Case
    </Button>
  );
}
