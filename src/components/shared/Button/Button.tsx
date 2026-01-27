import React, { type ComponentPropsWithoutRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "clean"
  | "destructive"
  | "success"
  | "icon";
type ButtonSize = "small" | "medium" | "large";
type ActionStyle = "filled" | "outline-subtle";

type ButtonProps = {
  variant?: ButtonVariant;
  actionStyle?: ActionStyle;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
  noAnimation?: boolean;
  isPulsing?: boolean;
  cleanStyle?: "button" | "link";
} & ComponentPropsWithoutRef<"button">;

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  actionStyle = "filled",
  cleanStyle = "button",
  size = "medium",
  isLoading,
  fullWidth = false,
  asChild = false,
  noAnimation = false,
  isPulsing = false,
  children,
  disabled = false,
  className,
  ...res
}) => {
  const Component = asChild ? Slot : "button";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-brand text-white hover:bg-brand-hover shadow-lg shadow-brand/20 focus:outline-brand",
    secondary:
      "bg-bg-card text-text-main border border-ui-border hover:border-brand hover:text-brand focus:outline-brand",
    success: clsx(
      "focus:outline-success transition-all",
      actionStyle === "filled" &&
        "bg-success text-white hover:bg-success-hover shadow-lg shadow-success/20",
      actionStyle === "outline-subtle" &&
        "bg-success/10 text-success border border-success/20 hover:bg-success/20",
    ),
    destructive: clsx(
      "focus:outline-error transition-all",
      actionStyle === "filled" &&
        "bg-error text-white hover:bg-error-hover shadow-lg shadow-error/20",
      actionStyle === "outline-subtle" &&
        "bg-error/10 text-error border border-error/20 hover:bg-error/20",
    ),
    clean: clsx(
      "bg-transparent text-text-dim hover:text-brand transition-colors focus:outline-brand",
      cleanStyle === "link" && "h-auto p-0 inline-flex focus:outline-none",
    ),
    icon: "bg-bg-card border border-ui-border text-text-dim hover:text-brand hover:border-brand p-0!",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    medium: variant === "icon" ? "w-11 h-11" : "h-11 py-3 px-4 text-base",
    large: variant === "icon" ? "w-12 h-12" : "h-12 py-3 px-5 text-lg",
    small: variant === "icon" ? "w-9 h-9" : "h-9 py-2 px-3 text-sm",
  };

  const baseStyles =
    "font-semibold inline-flex items-center justify-center transition-all duration-150 rounded-full select-none focus:outline-2 focus:outline-offset-2";
  const disabledStyles =
    "opacity-50 !cursor-not-allowed shadow-inner shadow-surface/50";

  const spinnerColors: Record<ButtonVariant, string> = {
    primary: "text-white",
    secondary: "text-brand",
    success: actionStyle === "filled" ? "text-white" : "text-success",
    destructive: actionStyle === "filled" ? "text-white" : "text-error",
    clean: "text-brand",
    icon: "text-brand",
  };

  return (
    <Component
      className={clsx(
        baseStyles,
        !(variant === "clean" && cleanStyle === "link") && sizeStyles[size],
        variantStyles[variant],
        !noAnimation && !isLoading && "active:scale-[0.98]",
        isPulsing && "animate-pulse",
        disabled && disabledStyles,
        fullWidth && "w-full",
        isLoading && "relative text-transparent! cursor-wait!",
        className,
      )}
      disabled={disabled || isLoading}
      {...res}
    >
      {asChild ? (
        children
      ) : (
        <>
          {isLoading && (
            <span
              className={clsx(
                "absolute inset-0 flex items-center justify-center",
                spinnerColors[variant],
              )}
            >
              <Loader2 className="animate-spin" size={20} />
            </span>
          )}
          {children}
        </>
      )}
    </Component>
  );
};
