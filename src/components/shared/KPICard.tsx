import * as React from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  updatedAt?: string;
  badge?: {
    label?: string;
    value?: string;
  };
  valueColor?: string;
  className?: string;
}

export default function KPICard({
  title,
  value,
  icon,
  updatedAt,
  badge,
  valueColor = "text-white",
  className,
}: KPICardProps) {
  return (
    <div className={`bg-[#FFFFFF1A] light:bg-white rounded-2xl p-6 shadow-sm ${className || ""}`}>
      {updatedAt && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 light:text-gray-500">{updatedAt}</span>
        </div>
      )}
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h4 className="text-sm font-medium text-gray-300 light:text-gray-700">{title}</h4>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-3xl font-bold ${valueColor}`}>{value}</span>
      </div>
      {badge && (
        <div className="mt-4 flex w-full justify-end">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#388E3C33] text-[#388E3C] light:bg-green-100 light:text-green-800">
            <span className="text-[#388E3C] light:text-green-800 font-light text-xs">{badge.label}:</span>
            <span className="ml-1 text-[#388E3C] light:text-green-800 font-semibold text-xs">{badge.value}</span>
          </span>
        </div>
      )}
    </div>
  );
}
