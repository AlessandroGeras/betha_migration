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
          <Link href={`/alterar-documento?id=${id}`}>
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
        Modulo
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("modulo")}</div>,
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
    accessorKey: "remessa",
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
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("remessa")}</div>,
    size: 200,
  },
  {
    accessorKey: "periodo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Período
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("periodo")}</div>,
    size: 200,
  },
  {
    accessorKey: "gerada",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Data Geração
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("gerada")}</div>,
    size: 200,
  },
  {
    accessorKey: "usuario",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Usuario
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("usuario")}</div>,
    size: 200,
  },  
];
