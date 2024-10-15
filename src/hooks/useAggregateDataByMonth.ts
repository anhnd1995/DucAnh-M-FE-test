import { useDateRange } from "@/providers/ChartDateRangeProvider";
import { getData } from "@/services/api";
import { IPostData } from "@/services/type";
import { sortData } from "@/utils/chartData";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function useAggregateDataByMonth() {
  const { startDate, endDate, sortMethod } = useDateRange();

  const { data } = useQuery({
    queryKey: ["getData"],
    queryFn: getData,
  });

  const aggregateDataByMonth = (data: IPostData[]) => {
    const monthlyData: {
      [key: string]: {
        likes: number;
        shares: number;
        comments: number;
        engagement: number;
      };
    } = {};

    data.forEach((d) => {
      const date = dayjs(d.date, "YYYY-MM-DD");
      if (
        (!startDate || date.isAfter(dayjs(startDate).subtract(1, "day"))) &&
        (!endDate || date.isBefore(dayjs(endDate).add(1, "day")))
      ) {
        const month = date.format("MMM YYYY");

        if (!monthlyData[month]) {
          monthlyData[month] = {
            likes: 0,
            shares: 0,
            comments: 0,
            engagement: 0,
          };
        }

        monthlyData[month].likes += d.likes;
        monthlyData[month].shares += d.shares;
        monthlyData[month].comments += d.comments;
        monthlyData[month].engagement += d.engagement;
      }
    });

    return Object.entries(monthlyData).map(([month, values]) => ({
      month,
      date: month, // Adding a dummy date field to match IPostData interface
      ...values,
    }));
  };

  const aggregatedData = sortData(aggregateDataByMonth(data ?? []), sortMethod);

  return { aggregatedData };
}

export default useAggregateDataByMonth;
