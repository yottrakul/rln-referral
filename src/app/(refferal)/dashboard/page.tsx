import LogoutButton from "@/app/_components/ui/Logout/LogoutButton";
import { Box, Img } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Box w={"full"}>
      {/* <Img src="http://localhost:3000/api/secureimg" alt="logo" /> */}
      <LogoutButton />
    </Box>
  );
}
