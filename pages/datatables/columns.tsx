import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoIosSearch } from 'react-icons/io';

export type Payment = {
  id: string
  Status: string
  Modulo: string
  Arquivo: string
  Nome: string
  Remessa: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: () => <div className="font-bold"></div>,
    cell: ({ row }) => {
      const id = parseFloat(row.getValue("id"));
      return <div className="text-2xl text-blue-900 font-bold"><IoIosSearch className="" /></div>;
    },
    size: 1,
  },
  {
    accessorKey: "Status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("Status")}</div>,
    size: 70,
  },
  {
    accessorKey: "Modulo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Modulo
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("Modulo")}</div>,
    size: 70,
  },
  {
    accessorKey: "Arquivo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Arquivo
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("Arquivo")}</div>,
    size: 150,
  },
  {
    accessorKey: "Nome",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Nome
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("Nome")}</div>,
    size: 150,
  },
  {
    accessorKey: "Remessa",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Remessa
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("Remessa")}</div>,
    size: 150,
  },
];
