import Papa from "papaparse";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { IPostData } from "@/services/type";
import "jspdf-autotable";

export const exportToCSV = <T>(
  data: T[],
  filename: string
  //   imageBase64?: string
): void => {
  const csvData = data;
  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (
  elementId: string,
  filename: string,
  dataTable?: IPostData[]
): void => {
  // show data table first then image
  const pdf = new jsPDF("p", "mm", "a4");

  const columns: { header: string; dataKey: keyof IPostData }[] = [
    { header: "Date", dataKey: "date" },
    { header: "Likes", dataKey: "likes" },
    { header: "Shares", dataKey: "shares" },
    { header: "Comments", dataKey: "comments" },
    { header: "Engagements", dataKey: "engagement" },
  ];

  const input = document.getElementById(elementId);
  if (!input) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }

  html2canvas(input)
    ?.then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal?.pageSize.getWidth() || 0;
      const pdfHeight = pdf.internal?.pageSize.getHeight() || 0;

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // add image to separate page from table

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`${filename}.pdf`);
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
    });

  if (dataTable) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (pdf as any).autoTable({
      head: [columns.map((col) => col.header)],
      body: dataTable.map((row) => columns.map((col) => row[col.dataKey])),
    });
    pdf.addPage();
  }
};
