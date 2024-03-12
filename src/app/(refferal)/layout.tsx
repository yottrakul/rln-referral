import { Box, Flex } from "@chakra-ui/react";
import Navbar from "@/app/_components/ui/sideBar/sideBar";
import AuthProviders from "@/app/_components/providers/AuthProvider";
import Userprofile from "../_components/ui/sideBar/Userprofile";
import { Suspense } from "react";
import UserprofileSkeleton from "../_components/ui/sideBar/UserprofileSkeleton";
import { getServerAuthSession } from "@/server/auth";

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
