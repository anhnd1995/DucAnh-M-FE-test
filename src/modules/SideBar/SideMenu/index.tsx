import React from "react";
import SideMenuItem from "./SideMenuItem";

const SideMenu = () => {
  return (
    <div className="pt-[106px] lg:pt-[35px] pb-[18px] flex flex-col gap-[26px] md:gap-0">
      <SideMenuItem
        path={"/"}
        icon={"assets/images/icons/icon-favorite-chart.svg"}
        name={"Dashboard"}
      />
      <SideMenuItem
        path={"/table"}
        icon={"assets/images/icons/icon-cms.svg"}
        name={"Table"}
      />
      <SideMenuItem
        path={"/chart"}
        icon={"assets/images/icons/icon-analytics.svg"}
        name={"Chart"}
      />
    </div>
  );
};

export default SideMenu;
