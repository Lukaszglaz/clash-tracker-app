"use client";

import React from "react";
import { Check } from "lucide-react";
import { clsx } from "clsx";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
}

export const Checkbox = ({
  label,
  error,
  className,
  ...props
}: CheckboxProps) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group w-full select-none">
      <div className="relative flex items-center justify-center shrink-0">
        <input
          {...props}
          type="checkbox"
          className={clsx(
            "appearance-none w-6 h-6 rounded-lg border-2 transition-all cursor-pointer",
            "bg-bg-card checked:bg-brand checked:border-brand outline-none",
            error
              ? "border-error bg-error/10"
              : "border-ui-border group-hover:border-brand/50 focus:border-brand",
            className,
          )}
        />
        <Check
          size={14}
          className={clsx(
            "absolute text-white pointer-events-none transition-all duration-200 scale-0",
            props.checked && "scale-100",
          )}
        />
      </div>
      <span
        className={clsx(
          "min-w-0 text-sm leading-6 transition-colors",
          error
            ? "text-error"
            : "text-text-dim opacity-70 group-hover:opacity-100 group-hover:text-text-main",
        )}
      >
        {label}
      </span>
    </label>
  );
};
