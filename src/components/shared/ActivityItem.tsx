import * as React from "react";

interface ActivityItemProps {
  description: string;
  timestamp: string;
  isLast?: boolean;
  className?: string;
}

export default function ActivityItem({
  description,
  timestamp,
  isLast = false,
  className,
}: ActivityItemProps) {
  return (
    <div className={`${isLast ? "" : "border-b border-gray-700 light:border-gray-300 pb-3"} ${className || ""}`}>
      <p className="text-sm text-gray-300 light:text-gray-700">{description}</p>
      <p className="text-xs text-gray-500 light:text-gray-500 mt-1">{timestamp}</p>
    </div>
  );
}
