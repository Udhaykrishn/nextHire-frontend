"use client";

import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { EllipsisIcon, FunnelX, Settings2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { DataGrid, DataGridContainer } from "@/ui/data-grid";
import { DataGridColumnHeader } from "@/ui/data-grid-column-header";
import { DataGridColumnVisibility } from "@/ui/data-grid-column-visibility";
import { DataGridPagination } from "@/ui/data-grid-pagination";
import { DataGridTableDnd } from "@/ui/data-grid-table-dnd";
import { DropdownMenuShortcut } from "@/ui/dropdown-menu";
import { Filter, Filters } from "@/ui/filters";
import { Input } from "@/ui/input";
import { Button } from "./animate-ui/components/buttons/button";
import { draftData } from "./data";
import { applyFilters, columnHelper, FILTER_FIELDS } from "./table-utils";

function RowActions({ row: _row }: { row: unknown }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="shadow-none"
            aria-label="Edit item"
          >
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Edit</span>
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Duplicate</span>
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Archive</span>
            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <span>Delete</span>
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function DraftTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [_columnOrder, setColumnOrder] = useState<string[]>([]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: ({ column }) => (
          <DataGridColumnHeader title="Name" column={column} />
        ),
        cell: ({ getValue }) => (
          <div className="font-medium">{String(getValue() || "")}</div>
        ),
        size: 180,
      }),
      columnHelper.accessor("email", {
        header: ({ column }) => (
          <DataGridColumnHeader title="Email" column={column} />
        ),
        cell: ({ getValue }) => <div>{String(getValue() || "")}</div>,
        size: 180,
      }),
      columnHelper.accessor("status", {
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ getValue }) => <div>{String(getValue() || "")}</div>,
        size: 180,
      }),
      columnHelper.accessor("phone", {
        header: ({ column }) => (
          <DataGridColumnHeader title="Phone" column={column} />
        ),
        cell: ({ getValue }) => <div>{String(getValue() || "")}</div>,
        size: 180,
      }),
      columnHelper.accessor("joinedDate", {
        header: ({ column }) => (
          <DataGridColumnHeader title="Joined Date" column={column} />
        ),
        cell: ({ getValue }) => <div>{String(getValue() || "")}</div>,
        size: 180,
      }),
      columnHelper.display({
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => <RowActions row={row} />,
        size: 60,
      }),
    ],
    [],
  );

  const filteredData = useMemo(
    () => applyFilters(draftData, filters),
    [filters],
  );

  const handleFiltersChange = useCallback((filters: Filter[]) => {
    setFilters(filters);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, []);

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    state: { pagination, sorting },
    enableSorting: true,
    enableSortingRemoval: false,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataGrid
      table={table}
      recordCount={filteredData?.length || 0}
      tableLayout={{
        rowBorder: true,
        headerBorder: true,
        width: "fixed",
        columnsDraggable: true,
        columnsMovable: true,
        columnsResizable: true,
        columnsPinnable: true,
        columnsVisibility: true,
      }}
    >
      <div className="w-full space-y-2.5">
        <div className="flex items-center justify-between">
          <Input
            className="peer min-w-60 h-8"
            value={(table.getState().globalFilter ?? "") as string}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            placeholder="Search all columns..."
            type="text"
          />
          <div className="flex items-center gap-2">
            <DataGridColumnVisibility
              table={table}
              trigger={
                <Button variant="outline" size="sm">
                  <Settings2 size={14} className="mr-2" /> View
                </Button>
              }
            />
            {filters.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setFilters([])}>
                <FunnelX size={14} className="mr-2" /> Clear
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1">
          <Filters
            filters={filters}
            fields={FILTER_FIELDS}
            variant="outline"
            onChange={handleFiltersChange}
          />
        </div>

        <DataGridContainer>
          <DataGridTableDnd handleDragEnd={handleDragEnd} />
        </DataGridContainer>
        <DataGridPagination />
      </div>
    </DataGrid>
  );
}
