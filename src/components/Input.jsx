import React, { forwardRef } from "react";
import cn from "classnames";

const Input = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "bg-primary-light border-transparent text-gray-300 text-sm rounded-lg focus:ring focus:ring-primary-light focus:border-primary block p-3 placeholder:text-gray-400 focus:border-primary/60",
        className
      )}
      {...props}
    />
  );
});

export default Input;
