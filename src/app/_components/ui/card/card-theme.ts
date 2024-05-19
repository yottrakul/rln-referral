/* eslint-disable @typescript-eslint/unbound-method */
import { cardAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  container: {
    boxShadow: "var(--chakra-shadows-base)",
  },
});

const variants = {
  solid: definePartsStyle({
    container: {
      borderTop: "0.5rem solid var(--chakra-colors-purple-500)",
    },
    header: {
      borderBottom: "1px solid",
      borderColor: "gray.200",
    },
  }),
};

export const cardTheme = defineMultiStyleConfig({ baseStyle, variants });
