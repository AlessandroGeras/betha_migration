import { IoMdAdd, IoIosSearch } from 'react-icons/io';
import * as React from "react";
import { useRouter } from 'next/router';
import {
  ColumnSizingState,
  SortingState,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  getPaginationRowModel,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "./columns";
import { ColumnResizer } from "../../components/ui/column-resizer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

interface DataTableProps<TData extends User, TValue> {
  columns: ColumnDef<User, TValue>[];
  data: TData[];
}

export function DataTable<TData extends User, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [colSizing, setColSizing] = React.useState<ColumnSizingState>({});
  const [pageSize, setPageSize] = React.useState<number>(10); // State for page size
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [filtering, setFiltering] = React.useState('');
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onColumnSizingChange: setColSizing,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFiltering,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnSizing: colSizing,
      columnFilters,
      globalFilter: filtering,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: pageSize, // Use state for page size
      },
    },
  });

  // Function to change page size
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    table.setPagination((prevState) => ({
      ...prevState,
      pageSize: size,
    }));
  };

  const addDocPendenteCollaboratorClick = () => {
    router.push('/incluir-prefeitura');
  }

  return (
    <div className="flex justify-left items-center">
      <div className="h-full bg-white w-[99%]">
        <div className="w-[99%] h-[600px] overflow-auto bg-white mx-auto">

          <div className='flex justify-between py-0.5'>
            <div className='flex items-center'>
              <input
                className="border-[2px] border-gray-500"
                placeholder="Pesquisa rápida"
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
              />

              <IoIosSearch className='text-xl ml-1 text-gray-500' />
            </div>

            <div className=''>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" className="ml-auto">
                    Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter(
                      (column) => column.getCanHide()
                    )
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <button
              className="border border-gray-300 pr-1 py-1.5 rounded bg-orange-600 text-white flex"
              onClick={addDocPendenteCollaboratorClick}
            >
              <IoMdAdd className='text-xl mt-[3px]' />Nova Prefeitura
            </button>
          </div>

          <div className="flex items-center py-2">

            {/* Filter de coluna */}
            {/* <Input
          placeholder="Filter Status..."
          value={(table.getColumn("Arquivo")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Arquivo")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}


          </div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="relative"
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      <ColumnResizer header={header} />
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
          <div className='w-full mt-4'>
            <div className="flex items-center justify-center space-x-1 pt-2">
              {/* Buttons for page navigation */}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
              {/* Page size selector */}
              <div>
                <select
                  className="p-1 border rounded bg-orange-600 ml-1 text-white"
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                >
                  <option value={10} >10</option>
                  <option value={50} >50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
