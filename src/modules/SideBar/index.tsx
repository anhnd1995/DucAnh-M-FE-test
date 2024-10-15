// import ThemeToggle from "@/components/ThemeToggle";
import React from "react";
import SideMenu from "./SideMenu";

const Sidebar = () => {
  return (
    <aside className="bg-white row-span-2 border-r border-neutral relative flex flex-col justify-between p-[5px] md:p-[25px] dark:bg-dark-neutral-bg dark:border-dark-neutral-border">
      <SideMenu />

      {/* <ThemeToggle /> */}
    </aside>
  );
};
export default Sidebar;
