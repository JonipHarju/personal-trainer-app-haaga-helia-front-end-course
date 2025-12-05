// source https://ui.shadcn.com/docs/components/date-picker
// original uses date-fns while I use luxon for date handling.
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { PopoverContent } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import type { Column } from "@tanstack/react-table";
import { DateTime } from "luxon";
import type { DateRange } from "react-day-picker";

interface DateRangeFilterProps<TData> {
  dateColumn: Column<TData>;
}

export default function DateRangeFilter<TData>({
  dateColumn,
}: DateRangeFilterProps<TData>) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    dateColumn.setFilterValue({
      start: range?.from?.toISOString(),
      end: range?.to?.toISOString(),
    });
  };

  const clearDateFilters = () => {
    setDateRange(undefined);
    dateColumn.setFilterValue(undefined);
  };

  return (
    <div className="grid grid-cols-[1fr_auto] gap-2 items-center my-1">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start ">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {DateTime.fromJSDate(dateRange.from).toFormat("dd LLL yyyy")}{" "}
                  - {DateTime.fromJSDate(dateRange.to).toFormat("dd LLL yyyy")}
                </>
              ) : (
                DateTime.fromJSDate(dateRange.from).toFormat("dd LLL yyyy")
              )
            ) : (
              "Pick dates"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleDateRangeChange}
          />
        </PopoverContent>
      </Popover>

      {dateRange && (
        <Button size="sm" onClick={clearDateFilters}>
          Reset
        </Button>
      )}
    </div>
  );
}
