import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

interface IconButtonProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLButtonElement> {
  icon?: LucideIcon;
  variant?: "default" | "ghost" | "primary";
  size?: "sm" | "md" | "lg";
  strokeWidth?: number;
  asButton?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  children?: React.ReactNode; // 新增 children 支持
}

export const IconButton = React.forwardRef<
  HTMLDivElement | HTMLButtonElement,
  IconButtonProps
>(
  (
    {
      icon: Icon,
      variant = "default",
      size = "md",
      strokeWidth = 2,
      className,
      asButton = false,
      disabled = false,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const sizeMap = {
      sm: 16,
      md: 20,
      lg: 24,
    };

    const variantStyles = {
      default: "text-muted-foreground hover:text-foreground",
      ghost: "hover:bg-accent text-muted-foreground hover:text-foreground",
      primary: "text-muted-foreground hover:text-primary",
    };

    const Component = asButton ? "button" : "div";

    const handleClick: React.MouseEventHandler<
      HTMLDivElement | HTMLButtonElement
    > = (e) => {
      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      onClick?.(e);
    };

    return (
      <Component
        ref={ref as any}
        className={cn(
          "cursor-pointer rounded-md p-1.5 transition-colors",
          variantStyles[variant],
          disabled
            ? "hover:text-muted-foreground cursor-not-allowed opacity-50 hover:bg-transparent"
            : "",
          className,
        )}
        onClick={handleClick}
        disabled={asButton ? disabled : undefined}
        {...props}
      >
        {children ??
          (Icon && <Icon size={sizeMap[size]} strokeWidth={strokeWidth} />)}
      </Component>
    );
  },
);

IconButton.displayName = "IconButton";
