import ActivityItem from "./ActivityItem";

interface Activity {
  description: string;
  timestamp: string;
}

interface ActivityListProps {
  activities: Activity[];
  className?: string;
}

export default function ActivityList({
  activities,
  className,
}: ActivityListProps) {
  return (
    <div className={`space-y-4 ${className || ""}`}>
      {activities.map((activity, index) => (
        <ActivityItem
          key={index}
          description={activity.description}
          timestamp={activity.timestamp}
          isLast={index === activities.length - 1}
        />
      ))}
    </div>
  );
}
