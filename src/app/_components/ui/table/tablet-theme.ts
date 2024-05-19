/* eslint-disable @typescript-eslint/unbound-method */
import { tableAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  table: {
    borderCollapse: "collapse",
    borderRadius: "5px 5px 0 0",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
    caption: {
      captionSide: "top",
      backgroundColor: "hsl(273, 64%, 50%)",
      fontSize: "xl",
      color: "white",
      fontWeight: "500",
      textAlign: "left",
      py: "0.7rem",
      marginTop: 0,
    },
  },

  thead: {
    th: {
      backgroundColor: "hsl(273, 64%, 60%)",
      fontSize: "md",
      color: "white",
      fontWeight: "500",
      position: "sticky",
      top: 0,
    },
  },

  tbody: {
    tr: {
      "&[data-state='selected']": {
        backgroundColor: "hsl(0, 0%, 96%)",
      },
      "&:hover": {
        backgroundColor: "hsl(0, 0%, 96%)",
      },
      "&:last-of-type": {
        borderBottom: "2px solid hsl(273, 64%, 60%)",
      },
      "&[data-state='selected'] > td:first-of-type": {
        boxShadow: "3px 0px inset hsl(273, 64%, 60%)",
      },
      // "@media (max-width: 767px)": {
      //   "&[data-state='selected'] td": {
      //     boxShadow: "3px 0px inset hsl(273, 64%, 60%)",
      //   },
      // },
      td: {
        paddingY: "1rem",
        transition: "all 0.3s ease",
        borderRight: "1px solid hsl(0, 0%, 90%)",
        "&:first-of-type": {
          borderLeft: "1px solid hsl(0, 0%, 90%)",
        },
      },
    },
  },

  td: {
    // "@media (max-width: 767px)": {
    //   overflowX: "auto",
    //   borderRight: "1px solid hsl(0, 0%, 90%)",
    //   borderLeft: "1px solid hsl(0, 0%, 90%)",
    //   display: "grid",
    //   gridTemplateColumns: "15ch auto",
    //   "& *[data-cell]": {
    //     display: "grid",
    //     gridTemplateColumns: "10ch auto",
    //   },
    //   "&[data-cell-action=true]": {
    //     display: "flex",
    //   },
    //   "&[data-cell-action=true] > *": {
    //     flex: "1",
    //   },
    //   "& *[data-cell]::before": {
    //     content: "attr(data-cell) ' : '",
    //     textTransform: "capitalize",
    //     fontWeight: "700",
    //   },
    //   "&[data-cell-action=true]::before": {
    //     content: "''",
    //   },
    //   "&:first-of-type": {
    //     paddingTop: "1.5rem",
    //   },
    //   "&:last-child": {
    //     paddingBottom: "1.5rem",
    //   },
    // },
  },

  th: {
    // "@media (max-width: 767px)": {
    //   display: "none",
    // },
  },
});

export const tableTheme = defineMultiStyleConfig({ baseStyle });
