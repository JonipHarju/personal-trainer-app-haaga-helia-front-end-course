import { Button } from "@/components/ui/button";
import type { Training } from "@/interfaces/training";
import type { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";

export function getTrainingColumns(
  handleDelete: (id: string, training: Training) => void
): ColumnDef<Training>[] {
  return [
    {
      accessorKey: "activity",
      header: "Activity",
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: (cell) =>
        DateTime.fromISO(cell.getValue() as string).toFormat(
          "dd LLL yyyy HH:mm"
        ),
      filterFn: (row, columnId, filterValue) => {
        // show all dates if no date chosen
        if (!filterValue) return true;

        const date = DateTime.fromISO(row.getValue(columnId) as string);
        const { start, end } = filterValue;

        // Hide the row if the date is before or after the set dates
        if (start && date < DateTime.fromISO(start)) return false;
        if (end && date > DateTime.fromISO(end).endOf("day")) return false;
        return true;
      },
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: (cell) => `${cell.getValue()} minutes`,

      filterFn: (row, columnId, filterValue) => {
        // shows all the rows if no filter is set
        if (!filterValue) return true;

        const duration = row.getValue(columnId) as number;
        const filterValues = filterValue as [number?, number?];

        const min = filterValues?.[0];
        const max = filterValues?.[1];

        // hide the duration row if it is outside of the min/max range
        if (min !== undefined && duration < min) return false;
        if (max !== undefined && duration > max) return false;

        return true;
      },
    },
    {
      id: "delete",
      header: "Delete",
      cell: ({ row }) => {
        const date = row.original;
        const dateId = date._links.self.href.split("/").pop() || "";

        return (
          <Button
            size={"sm"}
            onClick={() => handleDelete(dateId, date)}
            variant={"destructive"}
            className="cursor-pointer"
          >
            Delete
          </Button>
        );
      },
    },
  ];
}
