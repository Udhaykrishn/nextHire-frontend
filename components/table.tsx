"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuSeparator, DropdownMenuTrigger, } from "@radix-ui/react-dropdown-menu";
import { Button } from "./animate-ui/components/buttons/button";
import { EllipsisIcon, FunnelX, Settings2 } from "lucide-react";
import { useMemo, useState, useCallback } from "react";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, type PaginationState, type SortingState, useReactTable, } from "@tanstack/react-table"
import { DropdownMenuShortcut } from "@/ui/dropdown-menu";
import { Filter, FilterFieldConfig, Filters } from "@/ui/filters";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { DataGridColumnHeader } from "@/ui/data-grid-column-header";
import { DataGrid, DataGridContainer } from "@/ui/data-grid";
import { Input } from "@/ui/input";
import { DataGridColumnVisibility } from "@/ui/data-grid-column-visibility";
import { DataGridTableDnd } from "@/ui/data-grid-table-dnd";
import { DataGridPagination } from "@/ui/data-grid-pagination";
import { draftData, DraftData } from "./data";


function RowActions({
    row: _row
}: {
    row: any
}) {
    return (<DropdownMenu>
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
    </DropdownMenu>);
}

export default function DraftTable() {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filters, setFilters] = useState<Filter[]>([]);
    const [columnOrder, setColumnOrder] = useState<string[]>([]);
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const {
            active,
            over
        } = event;
        if (active && over && active.id !== over.id) {
            setColumnOrder((columnOrder) => {
                const oldIndex = columnOrder.indexOf(active.id as string);
                const newIndex = columnOrder.indexOf(over.id as string);
                return arrayMove(columnOrder, oldIndex, newIndex);
            });
        }
    }, []);
    const columnHelper = createColumnHelper<DraftData>()
    const columns = [
        columnHelper.accessor('name', {
            header: ({
                column
            }) => <DataGridColumnHeader title="Name" column={column} />,
            cell: ({
                getValue
            }) => <div className="font-medium">{String(getValue() || "")}</div>,
            size: 180,
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
            enablePinning: true,
        }),
        columnHelper.accessor('email', {
            header: ({
                column
            }) => <DataGridColumnHeader title="Email" column={column} />,
            cell: ({
                getValue
            }) => <div>{String(getValue() || "")}</div>,
            size: 180,
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
            enablePinning: true,
        }),
        columnHelper.accessor('status', {
            header: ({
                column
            }) => <DataGridColumnHeader title="Status" column={column} />,
            cell: ({
                getValue
            }) => <div>{String(getValue() || "")}</div>,
            size: 180,
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
            enablePinning: true,
        }),
        columnHelper.accessor('phone', {
            header: ({
                column
            }) => <DataGridColumnHeader title="Phone" column={column} />,
            cell: ({
                getValue
            }) => <div>{String(getValue() || "")}</div>,
            size: 180,
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
            enablePinning: true,
        }),
        columnHelper.accessor('joinedDate', {
            header: ({
                column
            }) => <DataGridColumnHeader title="Joined Date" column={column} />,
            cell: ({
                getValue
            }) => <div>{String(getValue() || "")}</div>,
            size: 180,
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
            enablePinning: true,
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <span className="sr-only">Actions</span>,
            cell: ({
                row
            }) => <RowActions row={row} />,
            size: 60,
            enableHiding: false,
            enableSorting: false,
            enableResizing: false,
            enablePinning: false,
        })
    ]
    const filterFields = useMemo<FilterFieldConfig[]>(() => [{
        key: "name",
        label: "name",
        type: "text",
        placeholder: "Filter by name..."
    }, {
        key: "email",
        label: "email",
        type: "email",
        placeholder: "Filter by email..."
    }, {
        key: "status",
        label: "status",
        type: "select",
        placeholder: "Filter by status...",
        options: [{
            label: "active",
            value: "active"
        }, {
            label: "inactive",
            value: "inactive"
        }],
        searchable: true,
        className: "w-[160px]"
    }, {
        key: "phone",
        label: "phone",
        type: "tel",
        placeholder: "Filter by phone..."
    }, {
        key: "joinedDate",
        label: "joinedDate",
        type: "datetime",
        placeholder: "Filter by joineddate..."
    }], []);
    // Apply filters to data
    const filteredData = useMemo(() => {
        const data = draftData;
        let filtered = [...data];
        // Filter out empty filters before applying
        const activeFilters = filters.filter((filter) => {
            const {
                operator,
                values
            } = filter;
            // Empty and not_empty operators don't require values
            if (operator === "empty" || operator === "not_empty") return true;
            // Check if filter has meaningful values
            if (!values || values.length === 0) return false;
            // For text/string values, check if they're not empty strings
            if (values.every((value) => typeof value === "string" && value.trim() === "")) return false;
            // For number values, check if they're not null/undefined
            if (values.every((value) => value === null || value === undefined)) return false;
            // For arrays, check if they're not empty
            if (values.every((value) => Array.isArray(value) && value.length === 0)) return false;
            return true;
        });
        activeFilters.forEach((filter) => {
            const {
                field,
                operator,
                values
            } = filter;
            filtered = filtered.filter((item) => {
                const fieldValue = item[field as keyof DraftData];
                switch (operator) {
                    case "is":
                        return values.some((value) => String(value) === String(fieldValue));
                    case "is_not":
                        return !values.some((value) => String(value) === String(fieldValue));
                    case "contains":
                        return values.some((value) => String(fieldValue).toLowerCase().includes(String(value).toLowerCase()));
                    case "not_contains":
                        return !values.some((value) => String(fieldValue).toLowerCase().includes(String(value).toLowerCase()));
                    case "starts_with":
                        return values.some((value) => String(fieldValue).toLowerCase().startsWith(String(value).toLowerCase()));
                    case "ends_with":
                        return values.some((value) => String(fieldValue).toLowerCase().endsWith(String(value).toLowerCase()));
                    case "equals":
                        return String(fieldValue) === String(values[0]);
                    case "not_equals":
                        return String(fieldValue) !== String(values[0]);
                    case "empty":
                        return fieldValue === null || fieldValue === undefined || String(fieldValue).trim() === "";
                    case "not_empty":
                        return fieldValue !== null && fieldValue !== undefined && String(fieldValue).trim() !== "";
                    default:
                        return true;
                }
            });
        });
        return filtered;
    }, [filters, draftData]);
    const handleFiltersChange = useCallback((filters: Filter[]) => {
        setFilters(filters);
        setPagination((prev) => ({
            ...prev,
            pageIndex: 0
        }));
    }, []);
    const table = useReactTable({
        columns,
        data: filteredData,
        pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
        state: {
            pagination,
            sorting,
        },
        enableSorting: true,
        enableSortingRemoval: false,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });
    return (<DataGrid table={table} recordCount={filteredData?.length || 0} tableLayout={{ rowBorder: true, headerBorder: true, width: "fixed", columnsDraggable: true, columnsMovable: true, columnsResizable: true, columnsPinnable: true, columnsVisibility: true }}>
        <div className="w-full space-y-2.5">

            <div>
                <Input
                    className="peer min-w-60 h-8"
                    value={(table.getState().globalFilter ?? "") as string}
                    onChange={(e) => table.setGlobalFilter(e.target.value)}
                    placeholder="Search all columns..."
                    type="text"
                    aria-label="Search all columns"
                />
            </div>

            <div className="flex items-center gap-3">
                <DataGridColumnVisibility
                    table={table}
                    trigger={<Button variant="outline" size='sm'><Settings2 />View</Button>}
                />
            </div>

            <div className="flex-1"><Filters
                filters={filters}
                fields={filterFields}
                variant="outline"
                onChange={handleFiltersChange}
            /></div>
            {filters.length > 0 && (
                <Button variant="outline" onClick={() => setFilters([])}>
                    <FunnelX /> Clear
                </Button>
            )}
            <DataGridContainer>
                {/* <ScrollArea> */}
                <DataGridTableDnd handleDragEnd={handleDragEnd} />
                {/* <ScrollBar orientation="horizontal" /> */}
                {/* </ScrollArea> */}
            </DataGridContainer>
            <DataGridPagination />
        </div>
    </DataGrid >);
};