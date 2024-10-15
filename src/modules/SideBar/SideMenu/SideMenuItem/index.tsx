"use client";
import { isMobile } from "@/constants/breakpoint";
import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import s from "./SideMenuItem.module.scss";

type Props = {
  path: string;
  icon: string;
  name: string;
};

const SideMenuItem = ({ path, icon, name }: Props) => {
  const pathName = usePathname();
  const size = useWindowSize();

  const isActive = useMemo(() => pathName === path, [pathName, path]);

  const id = path?.replace("/", "");

  return (
    <Link
      className={cn(`sidemenu-item rounded-xl relative block`, {
        [s.active]: isActive,
      })}
      href={path}
    >
      <input
        className="sr-only peer"
        type="checkbox"
        value={id}
        name="sidemenu"
        id={id}
      />
      <label
        htmlFor={id}
        className="flex items-center justify-center md:justify-between w-full cursor-pointer p-[10px] md:py-[17px] md:px-[21px] focus:outline-none peer-checked:border-transparent"
      >
        {isMobile(size?.width || 1000) ? (
          <div>
            <img src={icon} alt={`${id}-icon`} />
          </div>
        ) : (
          <div className="flex items-center gap-[10px]">
            {/* img(src=icon, alt='side menu icon') */}
            <img src={icon} alt={`${id}-icon`} />
            <span className="text-normal font-semibold text-gray-500 sidemenu-title dark:text-gray-dark-500">
              {name}
            </span>
          </div>
        )}
      </label>
    </Link>
  );
};

export default SideMenuItem;
