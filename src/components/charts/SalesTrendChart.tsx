import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import FilterDropdown from "@/components/shared/FilterDropdown";

interface SalesData {
  day: string;
  sales: number;
}

const generateSalesData = (): SalesData[] => {
  return [
    { day: "Mon", sales: 10 },
    { day: "Tues", sales: 5 },
    { day: "Wed", sales: 15 },
    { day: "Thurs", sales: 6 },
    { day: "Fri", sales: 19 },
    { day: "Sat", sales: 12 },
    { day: "Sun", sales: 9 },
  ];
};

const formatYAxis = (value: number): string => {
  return `${value}M`;
};

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
  if (active && payload && payload.length && payload[0]) {
    const data = payload[0].payload as SalesData;
    return (
      <div className="bg-[#27272A] light:bg-white border border-gray-700 light:border-gray-300 rounded-lg shadow-lg px-4 py-2">
        <div className="text-sm font-semibold text-white light:text-[#171717]">
          {data.sales}M
        </div>
      </div>
    );
  }
  return null;
};

export default function SalesTrendChart() {
  const [selectedRegion, setSelectedRegion] = React.useState("Region");
  const [selectedTime, setSelectedTime] = React.useState("Time");
  const [selectedProduct, setSelectedProduct] = React.useState("Product");

  const data = generateSalesData();
  const yAxisTicks = [5, 10, 15, 20, 25];

  const regionOptions = ["All Regions", "North", "South", "East", "West"];
  const timeOptions = ["This Week", "This Month", "This Quarter", "This Year"];
  const productOptions = ["All Products", "Product A", "Product B", "Product C"];

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-[#FBC02D] rounded"></div>
          <h3 className="text-lg font-semibold text-white light:text-[#171717]">Sales Trend</h3>
        </div>
        <div className="flex items-center gap-2">
          <FilterDropdown
            label="Region"
            options={regionOptions}
            value={selectedRegion}
            onValueChange={setSelectedRegion}
          />
          <FilterDropdown
            label="Time"
            options={timeOptions}
            value={selectedTime}
            onValueChange={setSelectedTime}
          />
          <FilterDropdown
            label="Product"
            options={productOptions}
            value={selectedProduct}
            onValueChange={setSelectedProduct}
          />
        </div>
      </div>
      <div className="h-64 lg:h-96 light:border-gray-300 rounded-lg relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FBC02D" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FBC02D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              stroke="#3f3f46"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fill: "#FBC02D", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              dx={-10}
              domain={[0, 25]}
              ticks={yAxisTicks}
              label={{
                value: "Sales(#M/D)",
                angle: -90,
                position: "insideLeft",
                fill: "#FBC02D",
                fontSize: 12,
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#FBC02D", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#FFFFFF"
              strokeWidth={2}
              fill="url(#colorSales)"
              dot={{ fill: "#FFFFFF", r: 4, strokeWidth: 2, stroke: "#FBC02D" }}
              activeDot={{ r: 6, fill: "#FFFFFF", strokeWidth: 2, stroke: "#FBC02D" }}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="absolute bottom-2 right-4">
          <span className="text-xs text-[#FBC02D]">Days</span>
        </div>
      </div>
    </>
  );
}
