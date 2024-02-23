import { Box, Flex } from "@chakra-ui/react";
import Topbar from "@/app/_components/ui/topBar/Topbar";
import Navbar from "@/app/_components/ui/sideBar/sideBar";

export const metadata = {
  title: "RCS|Refferal Dashboard",
  description: "RCS BY ...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      <Flex>
        <Navbar />
        <Box flex={1}>{children}</Box>
      </Flex>
    </>
  );
}
