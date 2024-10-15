// src/components/Filter/index.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "./index";
import { Column, Table } from "@tanstack/react-table";
import { isValidDateString } from "@/utils/date";
import { IPostData } from "@/services/type";

jest.mock("@/utils/date");

const mockColumn = {
  getFilterValue: jest.fn(),
  setFilterValue: jest.fn(),
  id: "date",
};

const mockTable = {
  getPreFilteredRowModel: jest.fn(),
};

describe("Filter Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders DatePicker components when firstValue is a valid date string", () => {
    (isValidDateString as jest.Mock).mockReturnValue(true);
    mockTable.getPreFilteredRowModel.mockReturnValue({
      flatRows: [{ getValue: () => "2023-01-01" }],
    });
    mockColumn.getFilterValue.mockReturnValue([new Date(), new Date()]);

    render(
      <Filter
        column={mockColumn as unknown as Column<IPostData, unknown>}
        table={mockTable as unknown as Table<IPostData[]>}
      />
    );

    expect(screen.getByPlaceholderText("Start Date")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("End Date")).toBeInTheDocument();
  });

  test("does not render DatePicker components when firstValue is not a valid date string", () => {
    (isValidDateString as jest.Mock).mockReturnValue(false);
    mockTable.getPreFilteredRowModel.mockReturnValue({
      flatRows: [{ getValue: () => "invalid-date" }],
    });

    render(
      <Filter
        column={mockColumn as unknown as Column<IPostData, unknown>}
        table={mockTable as unknown as Table<IPostData>}
      />
    );

    expect(screen.queryByPlaceholderText("Start Date")).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText("End Date")).not.toBeInTheDocument();
  });

  test("updates filter value correctly when DatePicker changes", () => {
    (isValidDateString as jest.Mock).mockReturnValue(true);
    mockTable.getPreFilteredRowModel.mockReturnValue({
      flatRows: [{ getValue: () => "2023-01-01" }],
    });
    mockColumn.getFilterValue.mockReturnValue([new Date(), new Date()]);

    render(
      <Filter
        column={mockColumn as unknown as Column<IPostData, unknown>}
        table={mockTable as unknown as Table<IPostData[]>}
      />
    );

    const startDatePicker = screen.getByPlaceholderText("Start Date");
    fireEvent.change(startDatePicker, { target: { value: "2023-01-02" } });
    // expect input value to be updated
    expect(startDatePicker).toHaveValue("2023-01-02");

    const endDatePicker = screen.getByPlaceholderText("End Date");
    fireEvent.change(endDatePicker, { target: { value: "2023-01-03" } });
    expect(endDatePicker).toHaveValue("2023-01-03");
  });

  test("resets filter value correctly when Reset button is clicked", () => {
    (isValidDateString as jest.Mock).mockReturnValue(true);
    mockTable.getPreFilteredRowModel.mockReturnValue({
      flatRows: [{ getValue: () => "2023-01-01" }],
    });
    mockColumn.getFilterValue.mockReturnValue([new Date(), new Date()]);

    render(
      <Filter
        column={mockColumn as unknown as Column<IPostData, unknown>}
        table={mockTable as unknown as Table<IPostData[]>}
      />
    );

    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);
    expect(mockColumn.setFilterValue).toHaveBeenCalledWith([null, null]);
  });
});
