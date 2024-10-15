import { IPostData } from "@/services/type";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const aggregateDataByMonth = (data: IPostData[]) => {
  const monthlyData: {
    [key: string]: {
      likes: number;
      shares: number;
      comments: number;
      engagement: number;
    };
  } = {};

  data.forEach((d) => {
    const month = dayjs(d.date, "YYYY-MM-DD").format("MMM");

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
  });

  return Object.entries(monthlyData).map(([month, values]) => ({
    month,
    ...values,
  }));
};

export const sortData = (
  data: IPostData[],
  method: "likes" | "shares" | "comments" | "engagement" | "date" = "date"
) => {
  switch (method) {
    case "likes":
      return data.sort((a, b) => b.likes - a.likes);
    case "shares":
      return data.sort((a, b) => b.shares - a.shares);
    case "comments":
      return data.sort((a, b) => b.comments - a.comments);
    case "engagement":
      return data.sort((a, b) => b.engagement - a.engagement);
    case "date":
    default:
      //   return data.sort((a, b) => dayjs(a.month).diff(dayjs(b.month)));
      // should return data sorted by month without using dayjs

      return data.sort((a, b) => {
        const aMonth = a.month ? a.month.toLowerCase() : "";
        const bMonth = b.month ? b.month.toLowerCase() : "";
        const months = [
          "jan",
          "feb",
          "mar",
          "apr",
          "may",
          "jun",
          "jul",
          "aug",
          "sep",
          "oct",
          "nov",
          "dec",
        ];

        return months.indexOf(aMonth) - months.indexOf(bMonth);
      });
  }
};
