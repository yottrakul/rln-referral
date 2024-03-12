import "@/styles/globals.css";

import { ChakraUIProviders } from "@/app/_components/providers/ChakraProvider";
import { getServerAuthSession } from "@/server/auth";
import AuthProviders from "@/app/_components/providers/AuthProvider";
import { ColorModeScript } from "@chakra-ui/react";
import { config } from "@/styles/theme";

export const metadata = {
  title: "RCS",
  description: "RCS BY ...",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ColorModeScript initialColorMode={config.initialColorMode} />
        <ChakraUIProviders>{children}</ChakraUIProviders>
      </body>
    </html>
  );
}
