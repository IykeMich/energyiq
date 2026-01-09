import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NotificationBadgeProps {
  count: number;
  className?: string;
}

export function NotificationBadge({
  count,
  className,
}: NotificationBadgeProps) {
  if (count === 0) return null;

  return (
    <Badge
      variant="destructive"
      className={cn(
        "ml-auto h-6 w-6 rounded-full p-0 text-xs font-medium",
        className
      )}
    >
      {count > 99 ? "99+" : count}
    </Badge>
  );
}