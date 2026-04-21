"use client";

import { ReactNode } from "react";
import { Button } from "@/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";

export interface Column<T> {
  id?: string;
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

export interface Action<T> {
  id?: string;
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
            {columns.map((column) => (
              <TableHead
                key={column.id || column.header}
                className={column.className}
              >
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
                  {columns.map((column) => (
                    <TableCell
                      key={column.id || column.header}
                      className={column.className}
                    >
                      {renderCell(row, column)}
                    </TableCell>
                  ))}
                  {actions && actions.length > 0 && (
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {actions
                          .filter((action) => !action.show || action.show(row))
                          .map((action) => {
                            const label =
                              typeof action.label === "function"
                                ? action.label(row)
                                : action.label;
                            const icon =
                              typeof action.icon === "function"
                                ? action.icon(row)
                                : action.icon;
                            const className =
                              typeof action.className === "function"
                                ? action.className(row)
                                : action.className;

                            return (
                              <Button
                                key={
                                  action.id ||
                                  (typeof action.label === "string"
                                    ? action.label
                                    : label)
                                }
                                variant="ghost"
                                size="sm"
                                className={`h-8 w-8 p-0 ${className || ""}`}
                                onClick={() => action.onClick(row)}
                                disabled={isRowLoading}
                                title={label}
                              >
                                {isRowLoading ? (
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                ) : (
                                  icon || (
                                    <span className="text-xs">{label}</span>
                                  )
                                )}
                              </Button>
                            );
                          })}
                      </div>
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
