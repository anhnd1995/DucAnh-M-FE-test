"use client";

import { isMobile } from "@/constants/breakpoint";
import Header from "@/modules/Header";
import Sidebar from "@/modules/SideBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useWindowSize } from "@uidotdev/usehooks";
import React, { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const MainLayout = ({ children }: PropsWithChildren) => {
  const size = useWindowSize();

  const gridCol = isMobile(size?.width || 1000)
    ? "grid-cols-[60px,1fr]"
    : "grid-cols-[257px,1fr]";

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`wrapper mx-auto text-gray-900 font-normal grid scrollbar-hide grid-rows-[auto,1fr] max-h-screen ${gridCol}`}
        id="layout"
      >
        <Sidebar />
        <div className="min-h-screen  pt-[42px] px-[23px] pb-[28px] overflow-y-scroll bg-neutral dark:bg-black">
          <Header />
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            {children}
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default MainLayout;
