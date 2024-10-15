import { aggregateDataByMonth, sortData } from "./chartData";
import { IPostData } from "@/services/type";

const mockData: IPostData[] = [
  { date: "2023-01-01", likes: 10, shares: 5, comments: 2, engagement: 17 },
  { date: "2023-01-15", likes: 20, shares: 10, comments: 5, engagement: 35 },
  { date: "2023-02-01", likes: 30, shares: 15, comments: 10, engagement: 55 },
];

describe("aggregateDataByMonth", () => {
  it("should aggregate data by month", () => {
    const result = aggregateDataByMonth(mockData);
    expect(result).toEqual([
      {
        month: "Jan",
        likes: 30,
        shares: 15,
        comments: 7,
        engagement: 52,
      },
      {
        month: "Feb",
        likes: 30,
        shares: 15,
        comments: 10,
        engagement: 55,
      },
    ]);
  });
});

describe("sortData", () => {
  const aggregatedData = aggregateDataByMonth(mockData);

  it("should sort data by likes", () => {
    const result = sortData(aggregatedData, "likes");
    expect(result).toEqual([
      {
        month: "Jan",
        likes: 30,
        shares: 15,
        comments: 7,
        engagement: 52,
      },
      {
        month: "Feb",
        likes: 30,
        shares: 15,
        comments: 10,
        engagement: 55,
      },
    ]);
  });

  it("should sort data by shares", () => {
    const result = sortData(aggregatedData, "shares");
    expect(result).toEqual([
      {
        month: "Jan",
        likes: 30,
        shares: 15,
        comments: 7,
        engagement: 52,
      },
      {
        month: "Feb",
        likes: 30,
        shares: 15,
        comments: 10,
        engagement: 55,
      },
    ]);
  });

  it("should sort data by comments", () => {
    const result = sortData(aggregatedData, "comments");
    expect(result).toEqual([
      {
        month: "Feb",
        likes: 30,
        shares: 15,
        comments: 10,
        engagement: 55,
      },
      {
        month: "Jan",
        likes: 30,
        shares: 15,
        comments: 7,
        engagement: 52,
      },
    ]);
  });

  it("should sort data by engagement", () => {
    const result = sortData(aggregatedData, "engagement");
    expect(result).toEqual([
      {
        month: "Feb",
        likes: 30,
        shares: 15,
        comments: 10,
        engagement: 55,
      },
      {
        month: "Jan",
        likes: 30,
        shares: 15,
        comments: 7,
        engagement: 52,
      },
    ]);
  });

  it("should sort data by date", () => {
    const result = sortData(aggregatedData, "date");
    expect(result).toEqual([
      {
        month: "Jan",
        likes: 30,
        shares: 15,
        comments: 7,
        engagement: 52,
      },
      {
        month: "Feb",
        likes: 30,
        shares: 15,
        comments: 10,
        engagement: 55,
      },
    ]);
  });
});
