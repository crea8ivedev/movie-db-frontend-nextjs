import React from "react";
import cn from "classnames";

export default function MovieGrid({ className, children, ...props }) {
  return (
    <div className={cn("grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-4", className)} {...props}>
      {children}
    </div>
  );
}
