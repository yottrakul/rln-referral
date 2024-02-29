import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

import { fonts } from "@/app/_lib/fonts";

export const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: fonts.kanit.style.fontFamily,
    body: fonts.kanit.style.fontFamily,
  },
});
