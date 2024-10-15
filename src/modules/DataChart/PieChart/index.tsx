import { getData } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const { data } = useQuery({
    queryKey: ["getData"],
    queryFn: getData,
  });

  // const { isDarkMode } = useTheme();

  // Summing the values for each metric across all dates
  const totalMetrics = data?.reduce(
    (totals, current) => {
      totals.likes += current.likes;
      totals.shares += current.shares;
      totals.comments += current.comments;
      totals.engagement += current.engagement;
      return totals;
    },
    { likes: 0, shares: 0, comments: 0, engagement: 0 }
  );

  const getPieChartData = () => {
    return {
      labels: ["Likes", "Shares", "Comments", "Engagement"],
      datasets: [
        {
          label: "Total Interactions",
          data: [
            totalMetrics?.likes,
            totalMetrics?.shares,
            totalMetrics?.comments,
            totalMetrics?.engagement,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)", // Color for Likes
            "rgba(54, 162, 235, 0.6)", // Color for Shares
            "rgba(255, 206, 86, 0.6)", // Color for Comments
            "rgba(75, 192, 192, 0.6)", // Color for Engagement
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Display legend at the top
      },

      title: {
        display: true,
        text: "Total Interactions Breakdown",
        font: {
          size: 16,
        },
      },
    },
  };

  const chartData = getPieChartData();

  return (
    <div className="grid place-items-center text-white">
      <Pie
        data={chartData}
        options={options}
        style={{
          width: "400px",
          height: "400px",
        }}
      />
    </div>
  );
};

export default PieChart;
