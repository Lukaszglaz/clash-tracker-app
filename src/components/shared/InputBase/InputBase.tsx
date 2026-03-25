"use client";

import { useState, forwardRef, cloneElement, isValidElement } from "react";
import type { InputHTMLAttributes, ReactNode, ReactElement } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export const InputBase = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      className,
      containerClassName,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div
        className={clsx(
          "flex flex-col gap-2 w-full",
          disabled && "opacity-60 cursor-not-allowed",
          containerClassName,
        )}
      >
        {label && (
          <label
            htmlFor={props.id}
            className={clsx(
              "ml-2 text-[0.72rem] font-black uppercase tracking-[0.12em] transition-colors",
              error ? "text-error" : isFocused ? "text-brand" : "text-text-dim",
            )}
          >
            {label}
          </label>
        )}

        <div className="relative group">
          {leftIcon && isValidElement(leftIcon) && (
            <div
              className={clsx(
                "absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-200 pointer-events-none",
                error
                  ? "text-error"
                  : isFocused
                    ? "text-brand"
                    : "text-text-dim/50",
              )}
            >
              {cloneElement(leftIcon as ReactElement<{ size?: number }>, {
                size: 18,
              })}
            </div>
          )}

          <input
            {...props}
            ref={ref}
            disabled={disabled}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={clsx(
              "w-full bg-bg-card border-2 transition-all duration-200 outline-none",
              "text-sm text-text-main placeholder:text-text-dim/30",
              "h-14 rounded-2xl",
              leftIcon ? "pl-14" : "pl-6",
              rightIcon ? "pr-14" : "pr-6",
              error
                ? "border-error focus:border-error shadow-sm shadow-error/10"
                : "border-ui-border focus:shadow-brand/10",
              className,
            )}
          />

          {rightIcon && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-[10px] font-bold text-error ml-2 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);
