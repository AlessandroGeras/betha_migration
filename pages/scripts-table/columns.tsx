import React from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoIosSearch } from 'react-icons/io';
import Link from 'next/link';

export type User = {
  id: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: () => <div className="font-bold"></div>,
    cell: ({ row }) => {
      const id = parseFloat(row.getValue("id"));
      return (
        <div className="text-2xl text-blue-900 font-bold">
          <Link href={`/alterar-layout?id=${id}`}>
              <IoIosSearch className="" />
          </Link>
        </div>
      );
    },
    size: 5,
  },
  {
    accessorKey: "status",
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
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("status")}</div>,
    size: 200,
  },
  {
    accessorKey: "modulo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Módulo
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("modulo")}</div>,
    size: 200,
  },
  {
    accessorKey: "nome",
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
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("nome")}</div>,
    size: 200,
  },
  {
    accessorKey: "arquivo",
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
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("arquivo")}</div>,
    size: 200,
  },
  {
    accessorKey: "entrega",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Entrega
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("entrega")}</div>,
    size: 200,
  }, 
 
];
