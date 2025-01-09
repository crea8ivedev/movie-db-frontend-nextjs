import React from "react";
import cn from "classnames";

export default function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center border border-transparent focus:border-primary transition-colors duration-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
