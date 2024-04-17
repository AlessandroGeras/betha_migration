import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  status: string
  modulo:string
  arquivo: string
  nome:string
  remessa:string
}

export const columns: ColumnDef<Payment>[] = [  
  {
    accessorKey: "Status",
    header: "Status",
  },
  {
    accessorKey: "Modulo",
    header: () => <div className="">modulo</div>,
  },
  {
    accessorKey: "Arquivo",
    header: () => <div className="">arquivo</div>,
  },
  {
    accessorKey: "Nome",
    header: () => <div className="">nome</div>,
  },
  {
    accessorKey: "Remessa",
    header: () => <div className="">remessa</div>,
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