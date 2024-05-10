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
    size: 35,
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
    accessorKey: "parceiro",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Parceiro
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("parceiro")}</div>,
    size: 200,
  },
  {
    accessorKey: "contato",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Contato
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("contato")}</div>,
    size: 200,
  },
  {
    accessorKey: "cnpj",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        CNPJ
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("cnpj")}</div>,
    size: 200,
  },
  {
    accessorKey: "endereco",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Endereço
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("endereco")}</div>,
    size: 200,
  },
  {
    accessorKey: "cidade",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Cidade
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("cidade")}</div>,
    size: 200,
  },
  {
    accessorKey: "uf",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        UF
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("uf")}</div>,
    size: 200,
  },
  {
    accessorKey: "telefone",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Telefone
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("telefone")}</div>,
    size: 200,
  },
  {
    accessorKey: "observacoes",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          console.log("Sorting button clicked");
          console.log("Is sorted:", column.getIsSorted());
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Observações
        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("observacoes")}</div>,
    size: 200,
  },
];
