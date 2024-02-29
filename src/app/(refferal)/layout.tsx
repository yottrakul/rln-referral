import { Box, Flex } from "@chakra-ui/react";
import Navbar from "@/app/_components/ui/sideBar/sideBar";

export const metadata = {
  title: "RCS|Refferal Dashboard",
  description: "RCS BY ...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Flex direction={{ base: "column", md: "row" }}>
        <Navbar />
        <Box flex={1}>{children}</Box>
      </Flex>
    </>
  );
}
