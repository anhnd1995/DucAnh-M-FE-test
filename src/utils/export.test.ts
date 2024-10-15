import jsPDF from "jspdf";
import Papa from "papaparse";
import { exportToCSV, exportToPDF } from "./export";

jest.mock("papaparse");
jest.mock("jspdf");
jest.mock("html2canvas-pro");

describe("exportToCSV", () => {
  it("should export data to CSV", () => {
    const mockData = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ];
    const mockCSV = "name,age\nJohn,30\nJane,25\n";
    const mockBlob = new Blob([mockCSV], { type: "text/csv" });
    const mockCreateObjectURL = jest.fn().mockReturnValue("mockURL");

    global.URL.createObjectURL = mockCreateObjectURL;

    exportToCSV(mockData, "test.csv");

    expect(Papa.unparse).toHaveBeenCalledWith(mockData);
    expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
  });
});

describe("exportToPDF", () => {
  it("should export element to PDF", async () => {
    const mockElement = document.createElement("div");
    mockElement.id = "testElement";
    document.body.appendChild(mockElement);

    const mockCanvas = document.createElement("canvas");
    const mockContext = mockCanvas.getContext("2d");
    if (mockContext) {
      mockContext.fillRect(0, 0, 100, 100);
    }

    await exportToPDF("testElement", "test.pdf");

    // expect file download to be called with name = test.pdf
    expect(jsPDF).toHaveBeenCalled();

    // cleanup
  });
});
