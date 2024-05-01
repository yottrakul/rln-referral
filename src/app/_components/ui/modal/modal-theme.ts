/* eslint-disable @typescript-eslint/unbound-method */
import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

// const baseStyle = definePartsStyle({
// });

// const variants = {
//   solid: definePartsStyle({
//     container: {
//       borderTop: "0.5rem solid var(--chakra-colors-purple-500)",
//     },
//     header: {
//       borderBottom: "1px solid",
//       borderColor: "gray.200",
//     },
//   }),
// };

const fourXl = defineStyle({
  maxW: "4xl",
});

const fiveXl = defineStyle({
  maxW: "5xl",
});

const sizes = {
  "4xl": definePartsStyle({
    dialog: fourXl,
  }),
  "5xl": definePartsStyle({
    dialog: fiveXl,
  }),
};

export const modalTheme = defineMultiStyleConfig({ sizes });
