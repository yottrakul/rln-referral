import { Box, Flex } from "@chakra-ui/react";
import Navbar from "@/app/_components/ui/sideBar/sideBar";
import { getServerAuthSession } from "@/server/auth";
import AuthProviders from "@/app/_components/providers/AuthProvider";

export const metadata = {
  title: "RCS|Refferal Dashboard",
  description: "RCS BY ...",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();
  return (
    <AuthProviders session={session}>
      <Flex direction={{ base: "column", md: "row" }}>
        <Navbar />
        <Box flex={1}>{children}</Box>
      </Flex>
    </AuthProviders>
  );
}
