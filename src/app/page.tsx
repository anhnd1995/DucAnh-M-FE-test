"use client";

import Dashboard from "@/modules/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}
