import { LucideIcon } from "lucide-react";

export function IconButton({
  icon: Icon,
  onClick,
  ...props
}: {
  icon: LucideIcon;
  onClick: (e) => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-muted-foreground hover:text-primary cursor-pointer"
    >
      <Icon size={16} {...props} />
    </button>
  );
}
