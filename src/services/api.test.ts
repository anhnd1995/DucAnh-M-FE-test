import { getData } from "./api";
import { MOCK_DATA } from "../mockData";
import { jest } from "@jest/globals";

jest.useFakeTimers();

describe("getData", () => {
  it("should fetch data correctly", async () => {
    const dataPromise = getData();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    const data = await dataPromise;

    expect(data).toEqual(MOCK_DATA);
  });
});
