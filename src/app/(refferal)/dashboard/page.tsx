import LogoutButton from "@/app/_components/ui/Logout/LogoutButton";
import { Box } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Box w={"full"}>
      Dashboard
      <LogoutButton />
    </Box>
  );
}
