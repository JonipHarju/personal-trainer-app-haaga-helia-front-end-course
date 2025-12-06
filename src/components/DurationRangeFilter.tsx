import type { Column } from "@tanstack/react-table";
import { Input } from "./ui/input";

interface DurationRangeFilterProps<TData> {
  rangeColumn: Column<TData>;
}

export default function DurationRangeFilter<TData>({
  rangeColumn,
}: DurationRangeFilterProps<TData>) {
  const filterValue = rangeColumn.getFilterValue() as [number?, number?];
  const min = filterValue?.[0];
  const max = filterValue?.[1];

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="number"
        min={0}
        value={min ?? ""}
        onChange={(e) => {
          const newMin = e.target.value ? Number(e.target.value) : undefined;
          rangeColumn.setFilterValue([newMin, max]);
        }}
        placeholder="Min"
      />
      <Input
        type="number"
        min={0}
        value={max ?? ""}
        onChange={(e) => {
          const newMax = e.target.value ? Number(e.target.value) : undefined;
          rangeColumn.setFilterValue([min, newMax]);
        }}
        placeholder="Max"
      />
    </div>
  );
}
