// source https://ui.shadcn.com/docs/components/date-picker
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

type DatePickerFieldProps = {
  label?: string;
  value: string;
  onChange: (date: Date | undefined) => void;
};

export function SingleDatePicker({ value, onChange }: DatePickerFieldProps) {
  const [open, setOpen] = useState(false);
  const nextYear = new Date().getFullYear() + 1;

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {value ? new Date(value).toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            // by default the calendar only shows to the end of current year, with this it will always display the next year also
            endMonth={new Date(nextYear, 11)}
            selected={value ? new Date(value) : undefined}
            captionLayout="dropdown"
            onSelect={(date) => {
              // default the time to 12:00. Further implementation could including adding a compoentn here to select the time.
              if (date) {
                date.setHours(12);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
              }

              onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
