import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, type, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <input
            type={type}
            id={inputId}
            ref={ref}
            className={cn(
              "w-full rounded-xl border-2 bg-white px-4 py-3 text-slate-900 transition-all duration-200",
              "placeholder:text-slate-400",
              "focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-400",
              icon && "pl-12",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                : "border-slate-200",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
