import React, { type ComponentPropsWithoutRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "clean" | "destructive";
type ButtonSize = "small" | "medium" | "large";
type DestructiveStyle = "filled" | "outline-subtle";

type ButtonProps = {
  variant?: ButtonVariant;
  destructiveStyle?: DestructiveStyle;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
  noAnimation?: boolean;
  isPulsing?: boolean; // Nowy prop do włączania pulsowania
} & ComponentPropsWithoutRef<"button">;

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  destructiveStyle = "filled",
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
    clean:
      "bg-transparent text-text-dim hover:text-brand active:text-brand-hover focus:outline-brand transition-colors",
    destructive:
      destructiveStyle === "filled"
        ? "bg-error text-white hover:bg-error-hover focus:outline-error"
        : "bg-error/10 text-error border border-error/20 hover:bg-error/20 focus:outline-error",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    medium: "h-11 py-3 px-4 text-base",
    large: "h-12 py-3 px-5 text-lg",
    small: "h-9 py-2 px-3 text-sm",
  };

  const baseStyles =
    "font-semibold inline-flex items-center justify-center transition-all duration-150 rounded-full select-none focus:outline-2 focus:outline-offset-2";

  const disabledStyles =
    "opacity-50 !cursor-not-allowed shadow-inner shadow-surface/50";

  const spinnerColors: Record<ButtonVariant, string> = {
    primary: "text-white",
    secondary: "text-brand",
    clean: "text-brand",
    destructive: destructiveStyle === "filled" ? "text-white" : "text-error",
  };

  return (
    <Component
      className={clsx(
        baseStyles,
        sizeStyles[size],
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
