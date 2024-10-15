export function isValidDate(d: string | number | Date): boolean {
  const parsedDate = new Date(d);
  return parsedDate instanceof Date && !Number.isNaN(parsedDate);
}

export const isValidDateString = (value: string | number | Date): boolean => {
  // Check if the value is a string and follows the format YYYY-MM-DD using a regular expression
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  // Convert the string to a Date object
  const date = new Date(value);

  // Ensure the Date object is valid and the string produces the same date components
  const [year, month, day] = value.split("-").map(Number);

  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month && // getMonth() is zero-based
    date.getDate() === day
  );
};
