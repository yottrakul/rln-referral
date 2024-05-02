import { extendTheme, type ThemeConfig, theme as base } from "@chakra-ui/react";
import { tableTheme } from "@/app/_components/ui/table/tablet-theme";
import { formTheme } from "@/app/_components/ui/form_control/form-control-theme";
import { cardTheme } from "@/app/_components/ui/card/card-theme";
import { modalTheme } from "@/app/_components/ui/modal/modal-theme";
import { fonts } from "@/app/_lib/fonts";

export const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// color brand base on 500 = #A058DA
const purple = {
  50: "#F6F1F9",
  100: "#E9D8F3",
  200: "#D7B4E8",
  300: "#C590DD",
  400: "#B36CD2",
  500: "#A058DA",
  600: "#8D44C7",
  700: "#7A30B4",
  800: "#671C9F",
  900: "#54088A",
};
export const theme = extendTheme({
  config,
  colors: {
    purple,
  },
  fonts: {
    heading: `${fonts.kanit.style.fontFamily}, ${base.fonts?.heading}`,
    body: `${fonts.kanit.style.fontFamily}, ${base.fonts?.body}`,
  },
  components: { Table: tableTheme, Form: formTheme, Card: cardTheme, Modal: modalTheme },
});
