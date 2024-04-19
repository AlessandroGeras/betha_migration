import { ColumnDef } from "@tanstack/react-table"

import { IoMdAdd, IoIosSearch, IoMdPrint } from 'react-icons/io';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  status: string
  modulo: string
  arquivo: string
  nome: string
  remessa: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: () => <div className="font-bold"></div>,
    cell: ({ row }) => {
      const id = parseFloat(row.getValue("id"))
      return <div className="text-2xl text-blue-900 font-bold"><IoIosSearch className="" /></div>
    },
    size: 1,
  },
  {
    accessorKey: "status",
    header: () => <div className="font-bold">Status</div>,
    cell: ({ row }) => {
      return <div className="text-blue-500 font-bold">{(row.original as any).Status}</div>;
    },
    size: 70,
  },
  {
    accessorKey: "Modulo",
    header: () => <div className="font-bold">Módulo</div>,
    cell: ({ row }) => {
      return <div className="">{(row.original as any).Modulo}</div>;
    },
    size: 70,
  },
  {
    accessorKey: "Arquivo",
    header: () => <div className="font-bold">Arquivo</div>,
    cell: ({ row }) => {
      return <div className="">{(row.original as any).Arquivo}</div>;
    },
    size: 150,
  },
  {
    accessorKey: "Nome",
    header: () => <div className="">Nome</div>,
    cell: ({ row }) => {
      return <div className="">{(row.original as any).Nome}</div>;
    },
    size: 70,
  },
  {
    accessorKey: "Remessa",
    header: () => <div className="font-bold">Remessa</div>,
    cell: ({ row }) => {
      return <div className="">{(row.original as any).Remessa}</div>;
    },
    size: 70,
  },
  /*  {
     accessorKey: "amount",
     header: () => <div className="">Amount</div>,
     cell: ({ row }) => {
       const amount = parseFloat(row.getValue("amount"))
       const formatted = new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD",
       }).format(amount)
  
       return <div className="font-medium">{formatted}</div>
     },
   }, */
]