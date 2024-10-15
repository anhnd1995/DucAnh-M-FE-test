import { render, screen, fireEvent, act } from "@testing-library/react";
import { DatePickerComponent, SortOptionsComponent } from "./index";
import { DateRangeProvider } from "@/providers/ChartDateRangeProvider";

describe("DatePickerComponent", () => {
  it("renders correctly and updates date range", () => {
    render(
      <DateRangeProvider>
        <DatePickerComponent />
      </DateRangeProvider>
    );
    const startDatePicker = screen.getByPlaceholderText("Start Date");
    const endDatePicker = screen.getByPlaceholderText("End Date");

    act(() => {
      fireEvent.change(startDatePicker, { target: { value: "2023-01-01" } });
      fireEvent.change(endDatePicker, { target: { value: "2023-01-31" } });
    });

    expect((startDatePicker as HTMLInputElement).value).toBe("01/01/2023");
    expect((endDatePicker as HTMLInputElement).value).toBe("01/31/2023");
  });
});

describe("SortOptionsComponent", () => {
  it("renders correctly and updates sort method", () => {
    render(
      <DateRangeProvider>
        <SortOptionsComponent />
      </DateRangeProvider>
    );
    const sortSelect = screen.getByLabelText("Sort By:");

    act(() => {
      fireEvent.change(sortSelect, { target: { value: "likes" } });
    });

    expect((sortSelect as HTMLSelectElement).value).toBe("likes");
  });
});
