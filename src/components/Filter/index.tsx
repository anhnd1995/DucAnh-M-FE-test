/* eslint-disable @typescript-eslint/no-explicit-any */
import { isValidDate, isValidDateString } from "@/utils/date";
import { Column, Table } from "@tanstack/react-table";
import DatePicker from "react-datepicker";

export default function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  if (isValidDateString(firstValue as string)) {
    const values = columnFilterValue as [Date, Date];
    const startDate = values?.[0];
    const endDate = values?.[1];
    return (
      <div>
        <div className="flex space-x-2 items-center">
          <DatePicker
            selected={startDate}
            onChange={(value) => {
              if (value !== null && isValidDate(value)) {
                column.setFilterValue((old: [Date, Date]) => [
                  new Date(value),
                  old?.[1],
                ]);
              }
            }}
            selectsStart
            startDate={startDate as Date}
            endDate={endDate as Date}
            placeholderText="Start Date"
            className="border shadow rounded p-[4px]"
          />
          <DatePicker
            selected={endDate}
            onChange={(value) => {
              if (value !== null && isValidDate(value))
                column.setFilterValue((old: [Date, Date]) => [
                  old?.[0],
                  new Date(value),
                ]);
            }}
            selectsEnd
            startDate={startDate as Date}
            endDate={endDate as Date}
            minDate={startDate as Date}
            placeholderText="End Date"
            className="border shadow rounded p-[4px]"
          />
          <p
            style={{
              cursor: !!startDate || !!endDate ? "pointer" : "not-allowed",
              opacity: !!startDate || !!endDate ? 1 : 0.5,
            }}
            onClick={() => {
              if (!!startDate || !!endDate) {
                // reset the date picker
                column.setFilterValue([null, null]);
              }
            }}
          >
            Reset
          </p>
        </div>
        <div className="h-1" />
      </div>
    );
  }

  return null;
}
