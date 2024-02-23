import "@/styles/globals.css";

import { ChakraUIProviders } from "./_components/providers/ChakraProvider";
import AuthProviders from "./_components/providers/AuthProvider";

export const metadata = {
  title: "RCS",
  description: "RCS BY ...",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProviders>
          <ChakraUIProviders>{children}</ChakraUIProviders>
        </AuthProviders>
      </body>
    </html>
  );
}
