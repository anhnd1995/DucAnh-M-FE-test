import useAggregateDataByMonth from "@/hooks/useAggregateDataByMonth";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const { aggregatedData } = useAggregateDataByMonth();

  const chartData = {
    labels: aggregatedData?.map((d) => d.month),
    datasets: [
      {
        label: "Likes",
        data: aggregatedData.map((item) => item.likes),
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Color for Likes
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Shares",
        data: aggregatedData.map((item) => item.shares),
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Color for Shares
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Comments",
        data: aggregatedData.map((item) => item.comments),
        backgroundColor: "rgba(255, 206, 86, 0.6)", // Color for Comments
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Engagement",
        data: aggregatedData.map((item) => item.engagement),
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Color for Engagement
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
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
        text: "Interactions Over Time",
      },
    },
    scales: {
      x: {
        stacked: true, // Stack bars by date
      },
      y: {
        beginAtZero: true, // Start Y-axis at zero
      },
    },
  };

  return (
    <div>
      <Bar
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

export default BarChart;
