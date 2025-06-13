// components/skeletons/sidebar-menu-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function SidebarMenuSkeleton() {
  return (
    <div className="space-y-2 px-4 pt-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-full rounded-md" />
      ))}
    </div>
  );
}
