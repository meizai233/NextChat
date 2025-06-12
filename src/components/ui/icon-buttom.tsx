// components/ui/icon-button.tsx
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

interface IconButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  variant?: "default" | "ghost" | "primary";
  size?: "sm" | "md" | "lg";
  strokeWidth?: number;
  asButton?: boolean; // 新增属性来控制是否渲染为 button
}

export const IconButton = React.forwardRef<
  HTMLDivElement | HTMLButtonElement,
  IconButtonProps
>(
  ({ 
    icon: Icon, 
    variant = "default", 
    size = "md",
    strokeWidth = 2,
    className,
    asButton = false, // 默认渲染为 div
    ...props 
  }, 
  ref
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

    const Component = asButton ? 'button' : 'div';

    return (
      <Component
        ref={ref as any}
        className={cn(
          "rounded-md p-1.5",
          "transition-colors",
          "cursor-pointer",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <Icon size={sizeMap[size]} strokeWidth={strokeWidth} />
      </Component>
    )
  }
);

IconButton.displayName = "IconButton";
