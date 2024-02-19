import { Flex } from "@chakra-ui/react";
import { ChakraUIProviders } from "../_components/providers/ChakraProvider";
import Topbar from "../_components/ui/topBar/Topbar";
import Navbar from "../_components/ui/sideBar/sideBar";

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
            <Navbar />
            {children}
          </Flex>
        </ChakraUIProviders>
      </body>
    </html>
  );
}
