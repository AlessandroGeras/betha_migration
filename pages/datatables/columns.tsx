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
    header: "",
    cell: ({ row }) => {
      const id = parseFloat(row.getValue("id"))

      return <div className="w-2 text-2xl text-blue-900 font-bold text-center"><IoIosSearch className="" /></div>
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="font-bold">Status</div>,
    cell: ({ row }) => {
      return <div className="">{(row.original as any).Status}</div>;
    },
  },
  {
    accessorKey: "Modulo",
    header: () => <div className="font-bold">Módulo</div>,
    cell: ({ row }) => {
      return <div className="">{(row.original as any).Modulo}</div>;
    },
  },
  {
    accessorKey: "Arquivo",
    header: () => <div className="font-bold">Arquivo</div>,
    cell: ({ row }) => {
      return <div className="">{(row.original as any).Arquivo}</div>;
    },
  },
  {
    accessorKey: "Nome",
    header: () => <div className="">Nome</div>,
  },
  {
    accessorKey: "Remessa",
    header: () => <div className="font-bold">Remessa</div>,
    cell: ({ row }) => {
      return <div className="">{(row.original as any).Remessa}</div>;
    },
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