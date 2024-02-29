"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";

export function ChakraUIProviders({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {children}
    </ChakraProvider>
  );
}
