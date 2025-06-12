import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon, Pencil, Trash } from "lucide-react";

interface SidebarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  label?: string;
  active?: boolean;
  onRename?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
  iconSize?: number;
  asChild?: boolean;
  hideActions?: boolean;
  justify?: "between" | "center";
}

export const SidebarButton = React.forwardRef<
  HTMLButtonElement,
  SidebarButtonProps
>(
  (
    {
      icon: Icon,
      label,
      active = false,
      onRename,
      onDelete,
      className,
      iconSize = 16,
      asChild = true,
      hideActions = false,
      justify = "between",
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? "div" : Button;

    return (
      <Component
        ref={ref}
        variant="ghost"
        className={cn(
          "group flex w-full cursor-pointer items-center gap-2 rounded-[var(--radius-lg)] border border-transparent px-3 py-2 text-sm font-medium",
          "bg-[var(--color-sidebar)] text-[var(--color-sidebar-foreground)]",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          "hover:border-sidebar-border hover:border hover:border-dashed",
          active &&
            "bg-sidebar-accent text-sidebar-accent-foreground border-sidebar",
          "transition-colors duration-200 ease-in-out",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "flex w-full items-center",
            justify === "center" ? "justify-center" : "justify-between",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2 overflow-hidden",
              justify === "center" && "justify-center",
            )}
          >
            {Icon && (
              <Icon
                size={iconSize}
                className={cn(
                  "shrink-0 transition-colors",
                  active
                    ? "text-sidebar-accent-foreground"
                    : "text-muted-foreground group-hover:text-sidebar-accent-foreground",
                )}
              />
            )}
            {label && <span className="truncate">{label}</span>}
          </div>

          {!hideActions && (onRename || onDelete) && (
            <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              {onRename && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRename(e);
                  }}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md p-1 transition-colors"
                  type="button"
                >
                  <Pencil size={16} />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(e);
                  }}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md p-1 transition-colors"
                  type="button"
                >
                  <Trash size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </Component>
    );
  },
);

SidebarButton.displayName = "SidebarButton";
