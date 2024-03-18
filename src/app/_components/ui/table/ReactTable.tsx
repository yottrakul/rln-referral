"use client";
import { Table, TableContainer, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import {
  type ColumnDef,
  type SortingState,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  type RowSelectionState,
} from "@tanstack/react-table";
import { type Dispatch, type SetStateAction, useState, useEffect } from "react";

type ReactTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  onRowSelectStateChange?: Dispatch<SetStateAction<TData[]>>;
};

export default function ReactTable<TData, TValue>({
  data,
  columns,
  onRowSelectStateChange,
}: ReactTableProps<TData, TValue>) {
  // SelectRow State
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      rowSelection,
    },
  });

  useEffect(() => {
    if (typeof onRowSelectStateChange !== "undefined") {
      onRowSelectStateChange(table.getSelectedRowModel().flatRows.map((row) => row.original));
    }
  }, [rowSelection, table, onRowSelectStateChange]);

  useEffect(() => {
    setRowSelection({});
  }, [data]);

  return (
    <TableContainer>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <Tr data-state={rowSelection ? (row.getIsSelected() ? "selected" : "false") : null} key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
                ))}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={columns.length} textAlign={"center"} h={24}>
                No Results
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
