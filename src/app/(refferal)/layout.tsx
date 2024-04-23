import { Box, Flex } from "@chakra-ui/react";
import Navbar from "@/app/_components/ui/Nav/sideBar";
import AuthProviders from "@/app/_components/providers/AuthProvider";
import ReactQueryProvider from "@/app/_components/providers/ReactQueryProvider";
import { getServerAuthSession } from "@/server/auth";
import ProgressBarProvider from "@/app/_components/providers/ProgressBarProvider";

export const metadata = {
  title: "RCS|Refferal Dashboard",
  description: "RCS BY ...",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();
  return (
    <ProgressBarProvider>
      <AuthProviders session={session}>
        <ReactQueryProvider>
          <Flex direction={{ base: "column", md: "row" }}>
            <Navbar />
            <Box overflowX={"auto"} flex={1} px={{ base: 4, md: 6, lg: 8 }} pt={4}>
              {children}
            </Box>
          </Flex>
        </ReactQueryProvider>
      </AuthProviders>
    </ProgressBarProvider>
  );
}
