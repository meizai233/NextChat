export function AppSidebarSkeleton() {
  return (
    <div className="w-[240px] animate-pulse space-y-4 bg-gray-100 p-4">
      <div className="h-6 w-3/4 rounded bg-gray-300" />
      <div className="h-4 w-5/6 rounded bg-gray-300" />
      <div className="h-4 w-2/3 rounded bg-gray-300" />
      <div className="h-4 w-1/2 rounded bg-gray-300" />
    </div>
  );
}
