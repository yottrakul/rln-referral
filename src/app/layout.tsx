import "@/styles/globals.css";

import { ChakraUIProviders } from "./_components/providers/ChakraProvider";
import Sidebar from "./_components/ui/sideBar/sideBar";
import { Flex } from "@chakra-ui/react";
import Topbar from "./_components/ui/topBar/Topbar";

export const metadata = {
  title: "RCS",
  description: "RCS BY ...",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraUIProviders>
          <Topbar />
          <Flex>
            <Sidebar />
            {children}
          </Flex>
        </ChakraUIProviders>
      </body>
    </html>
  );
}
