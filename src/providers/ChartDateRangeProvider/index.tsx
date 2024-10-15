import React, { createContext, useContext, useState, ReactNode } from "react";

interface DataChartContextProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  sortMethod: "date" | "likes" | "shares" | "comments" | "engagement";
  setSortMethod: (
    method: "date" | "likes" | "shares" | "comments" | "engagement"
  ) => void;
}

const DataChartContext = createContext<DataChartContextProps | undefined>(
  undefined
);

export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [sortMethod, setSortMethod] = useState<
    "date" | "likes" | "shares" | "comments" | "engagement"
  >("date");

  return (
    <DataChartContext.Provider
      value={{
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        sortMethod,
        setSortMethod,
      }}
    >
      {children}
    </DataChartContext.Provider>
  );
};

export const useDateRange = () => {
  const context = useContext(DataChartContext);
  if (!context) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
};
