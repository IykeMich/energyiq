import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface TopProduct {
  name: string;
  value: number;
  color: string;
}

interface LowStockAlert {
  name: string;
  quantity: string;
  level: "critical" | "warning";
}

const topProductsData: TopProduct[] = [
  { name: "Cooking Gas (LPG)", value: 80, color: "#FBC02D" },
  { name: "Petrol (PMS)", value: 75, color: "#3B82F6" },
  { name: "Diesel (AGO)", value: 60, color: "#9CA3AF" },
  { name: "Kerosene (DPK)", value: 60, color: "#4B5563" },
];

const lowStockAlerts: LowStockAlert[] = [
  { name: "Premium Gasoline (PMS)", quantity: "45,000L", level: "critical" },
  { name: "Automobile Gas Oil (AGO)", quantity: "28,000L", level: "critical" },
  { name: "Liquified Petroleum Gas (LPG)", quantity: "62,000L", level: "warning" },
];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
  if (active && payload && payload.length && payload[0]) {
    const data = payload[0];
    return (
      <div className="bg-[#27272A] light:bg-white border border-gray-700 light:border-gray-300 rounded-lg shadow-lg px-4 py-2">
        <div className="text-sm font-semibold text-white light:text-[#171717]">
          {data.name}: {data.value}%
        </div>
      </div>
    );
  }
  return null;
};


export default function InventoryStatusChart() {
  return (
    <div className="space-y-6">
      {/* Top Products Section */}
      <div>
        <h4 className="text-sm font-medium text-white light:text-[#171717] mb-4">
          Top Products:
        </h4>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Pie Chart */}
          <div className="w-full lg:w-[200px] h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topProductsData as any} // type cast to fix TypeScript error
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {topProductsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-3">
            {topProductsData.map((product, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: product.color }}
                />
                <span className="text-sm text-white light:text-[#171717] font-light">
                  {product.name} - {product.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low Stock Alerts Section */}
      <div>
        <h4 className="text-sm font-medium text-white light:text-[#171717] mb-4">
          Low Stock Alerts:
        </h4>
        <div className="space-y-3">
          {lowStockAlerts.map((alert, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${
                  alert.level === "critical"
                    ? "bg-red-500"
                    : "bg-[#FBC02D]"
                }`}
              />
              <span className="text-sm text-white light:text-[#171717] font-light">
                {alert.name} - {alert.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
