import { isValidDateString } from "./date";

describe("isValidDateString", () => {
  it("should return true for valid date strings", () => {
    expect(isValidDateString("2023-10-05")).toBe(true);
    expect(isValidDateString("2000-01-01")).toBe(true);
  });

  it("should return false for invalid date strings", () => {
    expect(isValidDateString("2023-13-05")).toBe(false); // Invalid month
    expect(isValidDateString("2023-10-32")).toBe(false); // Invalid day
    expect(isValidDateString("2023-02-29")).toBe(false); // Invalid day for non-leap year
    expect(isValidDateString("2023-2-5")).toBe(false); // Invalid format
    expect(isValidDateString("23-10-05")).toBe(false); // Invalid format
  });

  it("should return false for non-string inputs", () => {
    expect(isValidDateString(20231005)).toBe(false);
    expect(isValidDateString(new Date())).toBe(false);
    expect(isValidDateString("invalid")).toBe(false);
  });
});
