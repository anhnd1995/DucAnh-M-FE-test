import React, { PropsWithChildren } from "react";
import cn from "classnames";

type Props = {
  className?: string;
};

const CardWrapper = ({ className, children }: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        "border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border overflow-x-scroll md:overflow-x-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardWrapper;
