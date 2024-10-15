import BarChart from "./BarChart";
import LineChart from "./LineChart";

import {
  DateRangeProvider,
  useDateRange,
} from "@/providers/ChartDateRangeProvider";
import { Chart, registerables } from "chart.js";
import DatePicker from "react-datepicker";
import PieChart from "./PieChart";
import CardWrapper from "@/components/CardWrapper";
Chart.register(...registerables);

export const DatePickerComponent = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useDateRange();

  return (
    <div className="flex gap-4">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate as Date}
        endDate={endDate as Date}
        placeholderText="Start Date"
        className="border shadow rounded p-[4px]"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate as Date}
        endDate={endDate as Date}
        minDate={startDate as Date}
        placeholderText="End Date"
        className="border shadow rounded p-[4px]"
      />
    </div>
  );
};

export const SortOptionsComponent = () => {
  const { sortMethod, setSortMethod } = useDateRange();

  return (
    <div className="flex gap-4">
      <label htmlFor="sortMethod">Sort By:</label>
      <select
        id="sortMethod"
        className="border shadow rounded p-[4px]"
        value={sortMethod}
        onChange={(e) =>
          setSortMethod(
            e.target.value as
              | "date"
              | "likes"
              | "shares"
              | "comments"
              | "engagement"
          )
        }
      >
        <option value="date">Date</option>
        <option value="likes">Likes</option>
        <option value="shares">Shares</option>
        <option value="comments">Comments</option>
        <option value="engagement">Engagement</option>
      </select>
    </div>
  );
};

const DataChart = () => {
  return (
    <DateRangeProvider>
      <div
        className="flex items-start gap-[36px] flex-1 w-full flex-wrap"
        data-testid="data-chart"
      >
        <CardWrapper className="p-[25px] rounded-2xl relative flex-1">
          <div className="flex items-center justify-between flex-wrap gap-8">
            <DatePickerComponent />
            <SortOptionsComponent />
          </div>

          <div className="flex flex-col items-center justify-between gap-10">
            <LineChart />
            <BarChart />
          </div>
        </CardWrapper>

        <CardWrapper className="p-[25px] rounded-2xl  relative w-[500px]">
          <PieChart />
        </CardWrapper>
      </div>
    </DateRangeProvider>
  );
};

export default DataChart;
