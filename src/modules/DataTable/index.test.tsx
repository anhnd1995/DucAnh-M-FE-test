import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "./index";
import { useQuery } from "@tanstack/react-query";
import { IPostData } from "@/services/type";

// Mock the useQuery hook
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

const mockData: IPostData[] = [
  { date: "2023-01-01", likes: 10, shares: 5, comments: 2, engagement: 17 },
  { date: "2023-01-02", likes: 20, shares: 10, comments: 4, engagement: 34 },
];

describe("DataTable Component", () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isFetching: false,
    });
  });

  it("renders table headers correctly", () => {
    render(<DataTable />);
    expect(screen.getByTestId("table-header-date")).toBeInTheDocument();
    expect(screen.getByTestId("table-header-likes")).toBeInTheDocument();
    expect(screen.getByTestId("table-header-shares")).toBeInTheDocument();
    expect(screen.getByTestId("table-header-comments")).toBeInTheDocument();
    expect(screen.getByTestId("table-header-engagement")).toBeInTheDocument();
  });

  it("toggles column visibility correctly", () => {
    render(<DataTable />);
    const showHideButton = screen.getByRole("button", {
      name: /Show \/ Hide/i,
    });
    fireEvent.click(showHideButton);

    const likesCheckbox = screen.getByLabelText("Likes");
    const likesCol = screen.getByTestId("table-header-likes");
    fireEvent.click(likesCheckbox);
    expect(likesCol).not.toBeInTheDocument();

    fireEvent.click(likesCheckbox);
    expect(screen.getByTestId("table-header-likes")).toBeInTheDocument();
  });

  it("renders pagination component", () => {
    render(<DataTable />);
    expect(screen.getByText("<<")).toBeInTheDocument();
    expect(screen.getByText(">>")).toBeInTheDocument();
  });
});
