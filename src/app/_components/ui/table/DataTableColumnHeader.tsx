import { type Column } from "@tanstack/react-table";
import { type BoxProps, Box, Button } from "@chakra-ui/react";
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa6";

interface DataTableColumnHeaderProps<TData, TValue> extends BoxProps {
  column: Column<TData, TValue>;
  title: string;
}
export default function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  ...rest
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column?.getCanSort()) {
    return <Box {...rest}>{title}</Box>;
  }

  return (
    <Box {...rest}>
      <Button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        rightIcon={
          column.getIsSorted() === "desc" ? <FaSortDown /> : column.getIsSorted() === "asc" ? <FaSortUp /> : <FaSort />
        }
        variant="ghost"
        color={"white"}
        _hover={{ bg: "#ffffff28" }}
        textTransform={"uppercase"}
      >
        {title}
      </Button>
    </Box>
  );
}
