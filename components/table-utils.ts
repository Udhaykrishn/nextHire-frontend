import { createColumnHelper } from "@tanstack/react-table";
import { FilterFieldConfig } from "@/ui/filters";
import { DraftData } from "./data";

export const columnHelper = createColumnHelper<DraftData>();

export const FILTER_FIELDS: FilterFieldConfig[] = [
  {
    key: "name",
    label: "name",
    type: "text",
    placeholder: "Filter by name...",
  },
  {
    key: "email",
    label: "email",
    type: "email",
    placeholder: "Filter by email...",
  },
  {
    key: "status",
    label: "status",
    type: "select",
    placeholder: "Filter by status...",
    options: [
      { label: "active", value: "active" },
      { label: "inactive", value: "inactive" },
    ],
    searchable: true,
    className: "w-[160px]",
  },
  {
    key: "phone",
    label: "phone",
    type: "tel",
    placeholder: "Filter by phone...",
  },
  {
    key: "joinedDate",
    label: "joinedDate",
    type: "datetime",
    placeholder: "Filter by joineddate...",
  },
];

export function applyFilters(
  data: DraftData[],
  filters: { field: string; operator: string; values?: unknown[] }[],
) {
  let filtered = [...data];

  const activeFilters = filters.filter((filter) => {
    const { operator, values } = filter;
    if (operator === "empty" || operator === "not_empty") return true;
    if (!values || values.length === 0) return false;
    if (values.every((v: unknown) => typeof v === "string" && v.trim() === ""))
      return false;
    return true;
  });

  activeFilters.forEach((filter) => {
    const { field, operator, values = [] } = filter;
    filtered = filtered.filter((item) => {
      const fieldValue = item[field as keyof DraftData];
      switch (operator) {
        case "is":
          return values.some(
            (value: unknown) => String(value) === String(fieldValue),
          );
        case "is_not":
          return !values.some(
            (value: unknown) => String(value) === String(fieldValue),
          );
        case "contains":
          return values.some((value: unknown) =>
            String(fieldValue)
              .toLowerCase()
              .includes(String(value).toLowerCase()),
          );
        case "not_contains":
          return !values.some((value: unknown) =>
            String(fieldValue)
              .toLowerCase()
              .includes(String(value).toLowerCase()),
          );
        case "starts_with":
          return values.some((value: unknown) =>
            String(fieldValue)
              .toLowerCase()
              .startsWith(String(value).toLowerCase()),
          );
        case "ends_with":
          return values.some((value: unknown) =>
            String(fieldValue)
              .toLowerCase()
              .endsWith(String(value).toLowerCase()),
          );
        case "equals":
          return String(fieldValue) === String(values[0]);
        case "not_equals":
          return String(fieldValue) !== String(values[0]);
        case "empty":
          return (
            fieldValue === null ||
            fieldValue === undefined ||
            String(fieldValue).trim() === ""
          );
        case "not_empty":
          return (
            fieldValue !== null &&
            fieldValue !== undefined &&
            String(fieldValue).trim() !== ""
          );
        default:
          return true;
      }
    });
  });

  return filtered;
}
