import React from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoIosSearch } from 'react-icons/io';

export type User = {
  id: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: () => <div className="font-bold"></div>,
    cell: ({ row }) => {
      const id = parseFloat(row.getValue("id"));
      return <div className="text-2xl text-blue-900 font-bold"><IoIosSearch className="" /></div>;
    },
    size: 5,
  },
  {
    accessorKey: "perfil",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Perfil
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("perfil")}</div>,
    size: 900,
  },
];
