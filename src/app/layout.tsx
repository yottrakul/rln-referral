import "@/styles/globals.css";

import { ChakraUIProviders } from "./_components/providers/ChakraProvider";
import Navbar from "./_components/ui/navbar/Navbar";
import { Flex } from "@chakra-ui/react";

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
          <Flex>
            <Navbar />
            {children}
          </Flex>
        </ChakraUIProviders>
      </body>
    </html>
  );
}
