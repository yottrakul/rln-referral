import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { tableTheme } from "@/app/_components/ui/table/tablet-theme";
import { formTheme } from "@/app/_components/ui/form_control/form-control-theme";
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
  components: { Table: tableTheme, Form: formTheme },
});
