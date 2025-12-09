"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Button } from "@/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ReactNode } from "react";

export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => ReactNode);
    className?: string;
}

export interface Action<T> {
    label: string | ((row: T) => string);
    icon?: ReactNode | ((row: T) => ReactNode);
    onClick: (row: T) => void;
    className?: string | ((row: T) => string);
    show?: (row: T) => boolean;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    actions?: Action<T>[];
    emptyMessage?: string;
    getRowKey: (row: T) => string;
    isLoading?: string | null;
}

export function DataTable<T>({
    data,
    columns,
    actions,
    emptyMessage = "No data found",
    getRowKey,
    isLoading,
}: DataTableProps<T>) {
    const renderCell = (row: T, column: Column<T>) => {
        if (typeof column.accessor === "function") {
            return column.accessor(row);
        }
        return row[column.accessor] as ReactNode;
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableHead key={index} className={column.className}>
                                {column.header}
                            </TableHead>
                        ))}
                        {actions && actions.length > 0 && (
                            <TableHead className="text-right">Actions</TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length + (actions ? 1 : 0)}
                                className="h-24 text-center"
                            >
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row) => {
                            const rowKey = getRowKey(row);
                            const isRowLoading = isLoading === rowKey;

                            return (
                                <TableRow key={rowKey}>
                                    {columns.map((column, colIndex) => (
                                        <TableCell key={colIndex} className={column.className}>
                                            {renderCell(row, column)}
                                        </TableCell>
                                    ))}
                                    {actions && actions.length > 0 && (
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0"
                                                        disabled={isRowLoading}
                                                    >
                                                        <span className="sr-only">Open menu</span>
                                                        {isRowLoading ? (
                                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                        ) : (
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    {actions
                                                        .filter((action) => !action.show || action.show(row))
                                                        .map((action, actionIndex) => {
                                                            const label = typeof action.label === "function"
                                                                ? action.label(row)
                                                                : action.label;
                                                            const icon = typeof action.icon === "function"
                                                                ? action.icon(row)
                                                                : action.icon;
                                                            const className = typeof action.className === "function"
                                                                ? action.className(row)
                                                                : action.className;

                                                            return (
                                                                <DropdownMenuItem
                                                                    key={actionIndex}
                                                                    onClick={() => action.onClick(row)}
                                                                    className={`cursor-pointer ${className || ""}`}
                                                                >
                                                                    {icon && <span className="mr-2">{icon}</span>}
                                                                    <span>{label}</span>
                                                                </DropdownMenuItem>
                                                            );
                                                        })}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
