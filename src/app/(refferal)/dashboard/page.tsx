import LogoutButton from "@/app/_components/ui/logout/LogoutButton";
import { Box } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Box w={"full"}>
      {/* <Img src="http://localhost:3000/api/secureimg" alt="logo" /> */}
      <LogoutButton />
    </Box>
  );
}
