import { Checkbox } from "@chakra-ui/react";
import { type Row } from "@tanstack/react-table";

interface CheckboxTableProps<TData> {
  row: Row<TData>;
}

export default function CheckboxTable<TData>({ row }: CheckboxTableProps<TData>) {
  return (
    <Checkbox
      colorScheme="purple"
      size={"lg"}
      isChecked={row.getIsSelected()}
      onChange={() => {
        row.toggleSelected();
      }}
    />
  );
}
