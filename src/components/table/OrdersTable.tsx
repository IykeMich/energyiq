import * as React from "react";
import DefaultTable, { type Column } from "./DefaultTable";
import type { OrderDataProps } from "@/assets/dataset/OrderDataset";
import FilterDropdown from "@/components/shared/FilterDropdown";
import { Check, Clock, X, Truck, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RoutesConstant } from "@/utils/constant/RoutesConstant";
import { useRouterUtils } from "@/utils/useRouterUtils";

interface OrdersTableProps {
  data: OrderDataProps[];
  isLoading?: boolean;
}

type StatusTab = "All" | "Pending" | "Approved" | "Rejected" | "Delivered" | "Dispatched" | "Cancelled";

export default function OrdersTable({
  data,
  isLoading = false,
}: OrdersTableProps) {
  const [statusTab, setStatusTab] = React.useState<StatusTab>("All");
  const [dateFilter, setDateFilter] = React.useState<string>("");
  const [distributorFilter, setDistributorFilter] = React.useState<string>("");
  const [paymentStatusFilter, setPaymentStatusFilter] = React.useState<string>("");
  const [dateFilterLabel, setDateFilterLabel] = React.useState<string>("Date");
  const [distributorFilterLabel, setDistributorFilterLabel] = React.useState<string>("Distributor");
  const [paymentStatusFilterLabel, setPaymentStatusFilterLabel] = React.useState<string>("Payment Status");

  // Calculate counts for each status
  const statusCounts = React.useMemo(() => {
    const counts = {
      All: data.length,
      Pending: data.filter((item) => item.status === "Pending").length,
      Approved: data.filter((item) => item.status === "Approved").length,
      Rejected: data.filter((item) => item.status === "Rejected").length,
      Delivered: data.filter((item) => item.status === "Delivered").length,
      Dispatched: data.filter((item) => item.status === "Dispatched").length,
      Cancelled: data.filter((item) => item.status === "Cancelled").length,
    };
    return counts;
  }, [data]);

  // Filter data based on tab and filters
  const filteredData = React.useMemo(() => {
    let filtered = [...data];

    // Filter by status tab
    if (statusTab !== "All") {
      filtered = filtered.filter((item) => item.status === statusTab);
    }

    // Filter by date (placeholder - would need actual date filtering logic)
    if (dateFilter && dateFilter !== "All Dates") {
      // TODO: Implement date filtering
    }

    // Filter by distributor
    if (distributorFilter && distributorFilter !== "All Distributors") {
      filtered = filtered.filter((item) => item.distributor === distributorFilter);
    }

    // Filter by payment status
    if (paymentStatusFilter && paymentStatusFilter !== "All Payment Statuses") {
      filtered = filtered.filter((item) => item.payment === paymentStatusFilter);
    }

    return filtered;
  }, [data, statusTab, dateFilter, distributorFilter, paymentStatusFilter]);

  const handleFilterChange = (filterId: string, value: string) => {
    if (filterId === "date") {
      setDateFilter(value === "All Dates" ? "" : value);
      setDateFilterLabel(value === "All Dates" ? "Date" : value);
    } else if (filterId === "distributor") {
      setDistributorFilter(value === "All Distributors" ? "" : value);
      setDistributorFilterLabel(value === "All Distributors" ? "Distributor" : value);
    } else if (filterId === "paymentStatus") {
      setPaymentStatusFilter(value === "All Payment Statuses" ? "" : value);
      setPaymentStatusFilterLabel(value === "All Payment Statuses" ? "Payment Status" : value);
    }
  };

  const handleRemoveFilter = (filterId: string) => {
    if (filterId === "date") {
      setDateFilter("");
      setDateFilterLabel("Date");
    } else if (filterId === "distributor") {
      setDistributorFilter("");
      setDistributorFilterLabel("Distributor");
    } else if (filterId === "paymentStatus") {
      setPaymentStatusFilter("");
      setPaymentStatusFilterLabel("Payment Status");
    }
  };

  // Get active filters for display
  const activeFilters = React.useMemo(() => {
    const filters: Record<string, string> = {};
    if (dateFilter) {
      filters.date = dateFilterLabel;
    }
    if (distributorFilter) {
      filters.distributor = distributorFilterLabel;
    }
    if (paymentStatusFilter) {
      filters.paymentStatus = paymentStatusFilterLabel;
    }
    return filters;
  }, [dateFilter, distributorFilter, paymentStatusFilter, dateFilterLabel, distributorFilterLabel, paymentStatusFilterLabel]);

  // Get unique values for filters
  const distributors = React.useMemo(() => {
    return Array.from(new Set(data.map((d) => d.distributor)));
  }, [data]);

  // Status badge renderer
  const renderStatusBadge = (status: OrderDataProps["status"]) => {
    const statusConfig = {
      Pending: {
        className: "bg-orange-500/20 text-orange-400",
        icon: <Clock className="w-3 h-3" />,
      },
      Approved: {
        className: "bg-green-500/20 text-green-400",
        icon: <Check className="w-3 h-3" />,
      },
      Rejected: {
        className: "bg-red-500/20 text-red-400",
        icon: <X className="w-3 h-3" />,
      },
      Delivered: {
        className: "bg-teal-500/20 text-teal-400",
        icon: <Check className="w-3 h-3" />,
      },
      Dispatched: {
        className: "bg-blue-500/20 text-blue-400",
        icon: <Truck className="w-3 h-3" />,
      },
      Cancelled: {
        className: "bg-gray-500/20 text-gray-400",
        icon: <X className="w-3 h-3" />,
      },
    };

    const config = statusConfig[status];
    return (
      <span
        className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-light ${config.className}`}
      >
        {config.icon}
        <span className="hidden sm:inline">{status}</span>
        <span className="sm:hidden">{status.slice(0, 3)}</span>
      </span>
    );
  };

  // Payment badge renderer
  const renderPaymentBadge = (payment: OrderDataProps["payment"]) => {
    const paymentConfig = {
      Pending: {
        className: "bg-orange-500/20 text-orange-400",
        icon: <Clock className="w-3 h-3" />,
      },
      Paid: {
        className: "bg-green-500/20 text-green-400",
        icon: <Check className="w-3 h-3" />,
      },
      Failed: {
        className: "bg-red-500/20 text-red-400",
        icon: <X className="w-3 h-3" />,
      },
    };

    const config = paymentConfig[payment];
    return (
      <span
        className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-light ${config.className}`}
      >
        {config.icon}
        {payment}
      </span>
    );
  };

  const router = useRouterUtils();

  const columns: Column<OrderDataProps>[] = [
    {
      header: "ID",
      accessor: "id",
      width: "100px",
      headerClassName: "text-left",
      cellClassName: "font-medium text-left",
      render: (value) => <span onClick={() => router.navigateTo(RoutesConstant.order.view)} className="tap-effect text-white light:text-[#171717] text-xs sm:text-sm">{String(value)}</span>,
    },
    {
      header: "Date",
      accessor: "date",
      width: "120px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (value) => <span className="text-white light:text-[#171717] text-xs sm:text-sm">{String(value)}</span>,
    },
    {
      header: "Distributor",
      accessor: "distributor",
      width: "200px",
      headerClassName: "text-left",
      cellClassName: "text-left",
      render: (value) => <span className="text-white light:text-[#171717] text-xs sm:text-sm">{String(value)}</span>,
    },
    {
      header: "Items",
      accessor: "items",
      width: "80px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (value) => <span className="text-white light:text-[#171717] text-xs sm:text-sm">{String(value)}</span>,
    },
    {
      header: "Amount (#)",
      accessor: "amount",
      width: "130px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (value) => (
        <span className="text-white light:text-[#171717] font-medium text-xs sm:text-sm">{String(value)}</span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      width: "120px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (value) => renderStatusBadge(value as OrderDataProps["status"]),
    },
    {
      header: "Payment",
      accessor: "payment",
      width: "110px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (value) => renderPaymentBadge(value as OrderDataProps["payment"]),
    },
    {
      header: "Action",
      accessor: "id",
      width: "80px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (_value, row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-white light:text-[#171717] hover:text-[#FBC02D] transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[150px]">
            <DropdownMenuItem onClick={() => console.log("View details:", row.id)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Edit:", row.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => console.log("Delete:", row.id)}
              className="text-red-500 focus:text-red-500"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const tabs: StatusTab[] = ["All", "Pending", "Approved", "Rejected", "Delivered", "Dispatched", "Cancelled"];

  const filters = [
    {
      id: "date",
      label: dateFilterLabel,
      options: ["All Dates", "Today", "This Week", "This Month", "Last Month"],
      onChange: (value: string) => handleFilterChange("date", value),
    },
    {
      id: "distributor",
      label: distributorFilterLabel,
      options: ["All Distributors", ...distributors],
      onChange: (value: string) => handleFilterChange("distributor", value),
    },
    {
      id: "paymentStatus",
      label: paymentStatusFilterLabel,
      options: ["All Payment Statuses", "Pending", "Paid", "Failed"],
      onChange: (value: string) => handleFilterChange("paymentStatus", value),
    },
  ];

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden">
      {/* Status Tabs */}
      <div className="mb-4 sm:mb-6 border-b border-gray-600/50 light:border-gray-200 overflow-x-auto">
        <div className="flex gap-4 sm:gap-6 flex-nowrap min-w-max pb-2">
          {tabs.map((tab) => {
            const isActive = statusTab === tab;
            const count = statusCounts[tab];
            return (
              <button
                key={tab}
                onClick={() => setStatusTab(tab)}
                className={`pb-3 px-1 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${
                  isActive
                    ? "text-[#FBC02D]"
                    : "text-gray-400 light:text-gray-600 hover:text-white light:hover:text-[#171717]"
                }`}
              >
                {tab}
                <span className="ml-1 sm:ml-2 text-xs">({count})</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FBC02D]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 flex-wrap w-full">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-white light:text-[#171717]"
            >
              <path
                d="M2.5 5H17.5M5 10H15M7.5 15H12.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-sm text-white light:text-[#171717] font-light">
            Filter By:
          </span>
        </div>
        {filters.map((filter) => {
          const isActive = !!activeFilters[filter.id];
          const activeLabel = activeFilters[filter.id];
          
          if (isActive) {
            // Render as active filter pill
            return (
              <div
                key={filter.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#27272A] light:bg-gray-100 border border-gray-600 light:border-gray-300 rounded-full"
              >
                <span className="text-xs text-white light:text-[#171717] font-light">
                  {activeLabel}
                </span>
                <button
                  onClick={() => handleRemoveFilter(filter.id)}
                  className="text-white light:text-[#171717] hover:text-[#FBC02D] transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          } else {
            // Render as dropdown filter
            return (
              <FilterDropdown
                key={filter.id}
                label={filter.label}
                options={filter.options}
                onValueChange={(value) => handleFilterChange(filter.id, value)}
              />
            );
          }
        })}
      </div>

      {/* Table */}
      <DefaultTable
        columns={columns}
        data={filteredData}
        itemsPerPage={10}
        title="Orders Table"
        showSearch={false}
        filters={[]}
        isLoading={isLoading}
        noDataMessage="No orders found"
        className="h-auto!"
      />
    </div>
  );
}
