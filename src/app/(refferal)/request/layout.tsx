import { Box } from "@chakra-ui/react";

export const metadata = {
  title: "RCS | รายการคำขอ",
  description: "RCS BY ...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Box>{children}</Box>;
}
