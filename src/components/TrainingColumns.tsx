import type { Training } from "@/interfaces/training";
import type { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";

export const trainingColumns: ColumnDef<Training>[] = [
  {
    accessorKey: "activity",
    header: "Activity",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (cell) =>
      DateTime.fromISO(cell.getValue() as string).toFormat("dd LLL yyyy HH:mm"),
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;

      const date = DateTime.fromISO(row.getValue(columnId) as string);
      const { start, end } = filterValue;
      if (start && date < DateTime.fromISO(start)) return false;
      if (end && date > DateTime.fromISO(end).endOf("day")) return false;
      return true;
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: (cell) => `${cell.getValue()} minutes`,
    // TODO Fix filtering here
  },
];
