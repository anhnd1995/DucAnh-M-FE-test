import CardWrapper from "@/components/CardWrapper";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import DataChart from "../DataChart";
import DataTable from "../DataTable";

const Dashboard = () => {
  const pathname = usePathname();

  const isTablePage = useMemo(
    () => ["/", "/table"].includes(pathname),
    [pathname]
  );
  const isChartPage = useMemo(
    () => ["/", "/chart"].includes(pathname),
    [pathname]
  );

  return (
    <div className="w-full">
      <div className="h-[24px]"></div>
      <div className="flex items-start gap-[36px] w-full flex-col">
        {isTablePage && (
          <CardWrapper
            className="p-[25px] rounded-2xl min-h-[792px] relative flex-1 w-full data-table"
            data-testid="data-table"
          >
            <DataTable />
          </CardWrapper>
        )}
        {isChartPage && <DataChart data-testid="data-chart" />}
      </div>
    </div>
  );
};

export default Dashboard;
