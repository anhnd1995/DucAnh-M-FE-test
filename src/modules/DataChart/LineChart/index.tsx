"use client";

import useAggregateDataByMonth from "@/hooks/useAggregateDataByMonth";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Line } from "react-chartjs-2";

dayjs.extend(customParseFormat);

const LineChart = () => {
  // const aggregatedData = aggregateDataByMonth(data ?? []);
  const { aggregatedData } = useAggregateDataByMonth();

  const chartData = {
    labels: aggregatedData?.map((d) => d.month),
    datasets: [
      {
        label: "Likes",
        data: aggregatedData?.map((d) => d.likes),
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "Shares",
        data: aggregatedData?.map((d) => d.shares),
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
      },
      {
        label: "Comments",
        data: aggregatedData?.map((d) => d.comments),
        fill: false,
        borderColor: "rgba(255, 206, 86, 1)",
      },
      {
        label: "Engagement",
        data: aggregatedData?.map((d) => d.engagement),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Display legend at the top
      },
      title: {
        display: true,
        // what should I call this chart?,
        text: "Interactions Over Time",
      },
    },
  };

  return (
    <div>
      <Line
        data={chartData}
        options={options}
        style={{
          margin: "20px 0",
          width: "90%",
          height: "400px",
        }}
      />
    </div>
  );
};

export default LineChart;
