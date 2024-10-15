import { FilterFn } from "@tanstack/react-table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dateBetweenFilterFn: FilterFn<any> = (row, columnId, value) => {
  const date = new Date(row.getValue(columnId));
  const [start, end] = value; // value => two date input values
  //If one filter defined and date is null filter it
  if ((start || end) && !date) return false;
  if (start && !end) {
    return date.getTime() >= start.getTime();
  } else if (!start && end) {
    return date.getTime() <= end.getTime();
  } else if (start && end) {
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
  } else return true;
};

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
dateBetweenFilterFn.autoRemove;

export default dateBetweenFilterFn;
