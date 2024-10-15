import { IPostData } from "@/services/type";
import { exportToCSV, exportToPDF } from "@/utils/export";
import html2canvas from "html2canvas-pro";

function useExportFile<T extends unknown[]>({ data }: { data: T }) {
  const handleExportCSV = () => {
    if (!data) return;

    const chartContainer = document.getElementById("chart-container");
    if (!chartContainer) return;

    html2canvas(chartContainer).then(() => {
      //   const imageBase64 = canvas.toDataURL("image/png");
      exportToCSV(data, "data.csv");
    });
  };

  const handleExportPDF = () => {
    exportToPDF("chart-container", "chart", data as IPostData[]);
  };

  return { handleExportCSV, handleExportPDF };
}

export default useExportFile;
