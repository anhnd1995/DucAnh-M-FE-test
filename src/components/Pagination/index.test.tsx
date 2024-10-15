// src/components/Pagination/index.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./index";
import { Table } from "@tanstack/react-table";
import { IPostData } from "@/services/type";

const mockTable = {
  getCanPreviousPage: jest.fn(),
  getCanNextPage: jest.fn(),
  firstPage: jest.fn(),
  previousPage: jest.fn(),
  nextPage: jest.fn(),
  lastPage: jest.fn(),
  getState: jest.fn(),
  getPageCount: jest.fn(),
  setPageIndex: jest.fn(),
};

describe("Pagination Component", () => {
  beforeEach(() => {
    mockTable.getCanPreviousPage.mockReturnValue(true);
    mockTable.getCanNextPage.mockReturnValue(true);
    mockTable.getState.mockReturnValue({ pagination: { pageIndex: 0 } });
    mockTable.getPageCount.mockReturnValue(10);
  });

  test("renders pagination buttons", () => {
    render(<Pagination table={mockTable as unknown as Table<IPostData>} />);
    expect(screen.getByText("<<")).toBeInTheDocument();
    expect(screen.getByText("<")).toBeInTheDocument();
    expect(screen.getByText(">")).toBeInTheDocument();
    expect(screen.getByText(">>")).toBeInTheDocument();
  });

  test("buttons are enabled/disabled based on table state", () => {
    render(<Pagination table={mockTable as unknown as Table<IPostData>} />);
    expect(screen.getByText("<<")).not.toBeDisabled();
    expect(screen.getByText("<")).not.toBeDisabled();
    expect(screen.getByText(">")).not.toBeDisabled();
    expect(screen.getByText(">>")).not.toBeDisabled();

    mockTable.getCanPreviousPage.mockReturnValue(false);
    mockTable.getCanNextPage.mockReturnValue(false);
  });

  test("buttons call correct table methods when clicked", () => {
    render(<Pagination table={mockTable as unknown as Table<IPostData>} />);
    fireEvent.click(screen.getByText("<<"));
    expect(mockTable.firstPage).toHaveBeenCalled();

    fireEvent.click(screen.getByText("<"));
    expect(mockTable.previousPage).toHaveBeenCalled();

    fireEvent.click(screen.getByText(">"));
    expect(mockTable.nextPage).toHaveBeenCalled();

    fireEvent.click(screen.getByText(">>"));
    expect(mockTable.lastPage).toHaveBeenCalled();
  });

  test("input field updates page index correctly", () => {
    render(<Pagination table={mockTable as unknown as Table<IPostData>} />);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "3" } });
    expect(mockTable.setPageIndex).toHaveBeenCalledWith(2);
  });
});
