export function ChatPanelSkeleton() {
  return (
    <div className="flex-1 animate-pulse space-y-4 overflow-y-auto p-4">
      <div className="h-6 w-1/2 rounded bg-gray-200" />
      <div className="h-4 w-3/4 rounded bg-gray-200" />
      <div className="h-4 w-2/3 rounded bg-gray-200" />
      <div className="h-4 w-1/2 rounded bg-gray-200" />
    </div>
  );
}
