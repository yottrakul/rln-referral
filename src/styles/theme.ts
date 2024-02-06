import { extendTheme } from "@chakra-ui/react";

import { fonts } from "@/app/_lib/fonts";

export const theme = extendTheme({
  fonts: {
    heading: fonts.kanit.style.fontFamily,
    body: fonts.kanit.style.fontFamily,
  },
});
