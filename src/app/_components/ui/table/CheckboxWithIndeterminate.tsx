import { Checkbox } from "@chakra-ui/react";
import { type Table } from "@tanstack/react-table";

interface CheckboxWithIndeterminateProps<TData> {
  table: Table<TData>;
}

export default function CheckboxWithIndeterminate<TData>({ table }: CheckboxWithIndeterminateProps<TData>) {
  return (
    <Checkbox
      colorScheme="white"
      onChange={() => table.toggleAllPageRowsSelected()}
      aria-label="Select all"
      size={"lg"}
      isIndeterminate={table.getIsSomePageRowsSelected()}
      isChecked={table.getIsAllPageRowsSelected()}
    />
  );
}
