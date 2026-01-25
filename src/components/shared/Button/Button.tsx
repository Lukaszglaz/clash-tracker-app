import React, { type ComponentPropsWithoutRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "clean" | "destructive";
type ButtonSize = "small" | "medium" | "large";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
} & ComponentPropsWithoutRef<"button">;

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  isLoading,
  fullWidth = false,
  asChild = false,
  children,
  disabled = false,
  className,
  ...res
}) => {
  const Component = asChild ? Slot : "button";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-brand text-white hover:bg-brand-hover active:scale-[0.98] focus:outline-2 focus:outline-offset-2 focus:outline-brand shadow-lg shadow-brand/20 transition-all",

    secondary:
      "bg-bg-card text-text-main border border-ui-border  hover:border-brand hover:text-brand active:bg-bg-body focus:outline-2 focus:outline-offset-2 focus:outline-brand transition-all",

    clean:
      "bg-transparent text-text-dim hover:text-brand active:text-brand-hover focus:outline-2 focus:outline-offset-2 focus:outline-brand transition-colors",

    destructive:
      "bg-error text-white hover:bg-error-hover focus:outline-2 focus:outline-offset-2 focus:outline-error active:scale-[0.98] transition-all",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    medium: "h-11 py-3 px-4 text-base",
    large: "h-12 py-3 px-5 text-lg",
    small: "h-9 py-2 px-3 text-sm",
  };

  const disabledStyles =
    "opacity-50 !cursor-not-allowed shadow-inner shadow-surface/50 hover:blur-bg hover:text-current hover:border-current focus-visible:ring-0";

  const baseStyles =
    "font-semibold inline-flex items-center justify-center transition-all duration-150 rounded-full";

  const spinnerColors: Record<ButtonVariant, string> = {
    primary: "text-white",
    secondary: "text-brand",
    clean: "text-brand",
    destructive: "text-white",
  };

  return (
    <Component
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        disabled && disabledStyles,
        fullWidth && "w-full",
        isLoading && "relative text-transparent! cursor-wait! ",
        className,
      )}
      disabled={disabled || isLoading}
      {...res}
    >
      {isLoading && (
        <span
          className={clsx(
            "absolute inset-0 flex items-center justify-center",
            spinnerColors[variant],
          )}
        >
          <Loader2 className="animate-spin" size={24} />
        </span>
      )}
      {children}
    </Component>
  );
};
