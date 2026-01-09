import * as React from "react";
import DefaultTable, { type Column } from "./DefaultTable";
import type { ComplaintDataProps } from "@/assets/dataset/ComplaintDataset";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ComplaintsTableProps {
  data: ComplaintDataProps[];
  isLoading?: boolean;
}

export default function ComplaintsTable({
  data,
  isLoading = false,
}: ComplaintsTableProps) {
  const [dateFilter, setDateFilter] = React.useState<string>("");
  const [typeFilter, setTypeFilter] = React.useState<string>("");
  const [productFilter, setProductFilter] = React.useState<string>("");
  const [statusFilter, setStatusFilter] = React.useState<string>("");
  const [severityFilter, setSeverityFilter] = React.useState<string>("");
  const [dateFilterLabel, setDateFilterLabel] = React.useState<string>("Date");
  const [typeFilterLabel, setTypeFilterLabel] = React.useState<string>("Type");
  const [productFilterLabel, setProductFilterLabel] = React.useState<string>("Product");
  const [statusFilterLabel, setStatusFilterLabel] = React.useState<string>("Status");
  const [severityFilterLabel, setSeverityFilterLabel] = React.useState<string>("Severity");

  // Filter data based on filters
  const filteredData = React.useMemo(() => {
    let filtered = [...data];

    // Filter by date (placeholder - would need actual date filtering logic)
    if (dateFilter && dateFilter !== "All Dates") {
      // TODO: Implement date filtering
    }

    // Filter by type
    if (typeFilter && typeFilter !== "All Types") {
      filtered = filtered.filter((item) => item.type === typeFilter);
    }

    // Filter by product
    if (productFilter && productFilter !== "All Products") {
      filtered = filtered.filter((item) => item.product === productFilter);
    }

    // Filter by status
    if (statusFilter && statusFilter !== "All Statuses") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    // Filter by severity
    if (severityFilter && severityFilter !== "All Severities") {
      filtered = filtered.filter((item) => item.severity === severityFilter);
    }

    return filtered;
  }, [data, dateFilter, typeFilter, productFilter, statusFilter, severityFilter]);

  const handleFilterChange = (filterId: string, value: string) => {
    if (filterId === "date") {
      setDateFilter(value === "All Dates" ? "" : value);
      setDateFilterLabel(value === "All Dates" ? "Date" : value);
    } else if (filterId === "type") {
      setTypeFilter(value === "All Types" ? "" : value);
      setTypeFilterLabel(value === "All Types" ? "Type" : value);
    } else if (filterId === "product") {
      setProductFilter(value === "All Products" ? "" : value);
      setProductFilterLabel(value === "All Products" ? "Product" : value);
    } else if (filterId === "status") {
      setStatusFilter(value === "All Statuses" ? "" : value);
      setStatusFilterLabel(value === "All Statuses" ? "Status" : value);
    } else if (filterId === "severity") {
      setSeverityFilter(value === "All Severities" ? "" : value);
      setSeverityFilterLabel(value === "All Severities" ? "Severity" : value);
    }
  };

  const handleRemoveFilter = (filterId: string) => {
    if (filterId === "date") {
      setDateFilter("");
      setDateFilterLabel("Date");
    } else if (filterId === "type") {
      setTypeFilter("");
      setTypeFilterLabel("Type");
    } else if (filterId === "product") {
      setProductFilter("");
      setProductFilterLabel("Product");
    } else if (filterId === "status") {
      setStatusFilter("");
      setStatusFilterLabel("Status");
    } else if (filterId === "severity") {
      setSeverityFilter("");
      setSeverityFilterLabel("Severity");
    }
  };

  // Get active filters for display
  const activeFilters = React.useMemo(() => {
    const filters: Record<string, string> = {};
    if (dateFilter) {
      filters.date = dateFilterLabel;
    }
    if (typeFilter) {
      filters.type = typeFilterLabel;
    }
    if (productFilter) {
      filters.product = productFilterLabel;
    }
    if (statusFilter) {
      filters.status = statusFilterLabel;
    }
    if (severityFilter) {
      filters.severity = severityFilterLabel;
    }
    return filters;
  }, [
    dateFilter,
    typeFilter,
    productFilter,
    statusFilter,
    severityFilter,
    dateFilterLabel,
    typeFilterLabel,
    productFilterLabel,
    statusFilterLabel,
    severityFilterLabel,
  ]);

  // Get unique values for filters
  const types = React.useMemo(() => {
    return Array.from(new Set(data.map((d) => d.type)));
  }, [data]);

  const products = React.useMemo(() => {
    return Array.from(new Set(data.map((d) => d.product)));
  }, [data]);

  const statuses = React.useMemo(() => {
    return Array.from(new Set(data.map((d) => d.status)));
  }, [data]);

  const severities: ComplaintDataProps["severity"][] = React.useMemo(() => {
    return Array.from(new Set(data.map((d) => d.severity))) as ComplaintDataProps["severity"][];
  }, [data]);

  // Status badge renderer
  const renderStatusBadge = (status: ComplaintDataProps["status"]) => {
    const statusConfig = {
      Pending: {
        className: "bg-orange-500/20 text-orange-400",
      },
      "In Review": {
        className: "bg-blue-500/20 text-blue-400",
      },
      Resolved: {
        className: "bg-green-500/20 text-green-400",
      },
      Closed: {
        className: "bg-gray-500/20 text-gray-400",
      },
      Escalated: {
        className: "bg-red-500/20 text-red-400",
      },
    };

    const config = statusConfig[status];
    return (
      <span
        className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-light ${config.className}`}
      >
        {status}
      </span>
    );
  };

  // Severity badge renderer
  const renderSeverityBadge = (severity: ComplaintDataProps["severity"]) => {
    const severityConfig = {
      Low: {
        className: "bg-green-500/20 text-green-400",
      },
      Medium: {
        className: "bg-yellow-500/20 text-yellow-400",
      },
      High: {
        className: "bg-orange-500/20 text-orange-400",
      },
      Critical: {
        className: "bg-red-500/20 text-red-400",
      },
    };

    const config = severityConfig[severity];
    return (
      <span
        className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-light ${config.className}`}
      >
        {severity}
      </span>
    );
  };

  const columns: Column<ComplaintDataProps>[] = [
    {
      header: "ID",
      accessor: "id",
      width: "150px",
      headerClassName: "text-left",
      cellClassName: "font-medium text-left",
      render: (value) => (
        <span className="text-white light:text-[#171717] text-xs sm:text-sm">{String(value)}</span>
      ),
    },
    {
      header: "Distributor",
      accessor: "distributor",
      width: "180px",
      headerClassName: "text-left",
      cellClassName: "text-left",
      render: (value) => (
        <span className="text-white light:text-[#171717] text-xs sm:text-sm">{String(value)}</span>
      ),
    },
    {
      header: "Order No",
      accessor: "orderNo",
      width: "150px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (value) => (
        <span className="text-white light:text-[#171717] text-xs sm:text-sm">{String(value)}</span>
      ),
    },
    {
      header: "Product",
      accessor: "product",
      width: "140px",
      headerClassName: "text-left",
      cellClassName: "text-left",
      render: (value) => (
        <span className="text-white light:text-[#171717] text-xs sm:text-sm">{String(value)}</span>
      ),
    },
    {
      header: "Type",
      accessor: "type",
      width: "180px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (value) => (
        <span className="text-white light:text-[#171717] text-xs sm:text-sm">{String(value)}</span>
      ),
    },
    {
      header: "Severity",
      accessor: "severity",
      width: "110px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (value) => renderSeverityBadge(value as ComplaintDataProps["severity"]),
    },
    {
      header: "Status",
      accessor: "status",
      width: "120px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (value) => renderStatusBadge(value as ComplaintDataProps["status"]),
    },
    {
      header: "Submitted",
      accessor: "submitted",
      width: "220px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (value) => (
        <span className="text-white light:text-[#171717] text-xs sm:text-sm">{String(value)}</span>
      ),
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
            <DropdownMenuItem onClick={() => console.log("Resolve:", row.id)}>
              Resolve
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

  const filters = [
    {
      id: "date",
      label: dateFilterLabel,
      options: ["All Dates", "Today", "This Week", "This Month", "Last Month"],
      onChange: (value: string) => handleFilterChange("date", value),
    },
    {
      id: "type",
      label: typeFilterLabel,
      options: ["All Types", ...types],
      onChange: (value: string) => handleFilterChange("type", value),
    },
    {
      id: "product",
      label: productFilterLabel,
      options: ["All Products", ...products],
      onChange: (value: string) => handleFilterChange("product", value),
    },
    {
      id: "status",
      label: statusFilterLabel,
      options: ["All Statuses", ...statuses],
      onChange: (value: string) => handleFilterChange("status", value),
    },
    {
      id: "severity",
      label: severityFilterLabel,
      options: ["All Severities", ...severities],
      onChange: (value: string) => handleFilterChange("severity", value),
    },
  ];

  return (
    <DefaultTable
      columns={columns}
      data={filteredData}
      itemsPerPage={6}
      title="Complaints Table"
      showSearch={false}
      filters={filters}
      activeFilters={activeFilters}
      onRemoveFilter={handleRemoveFilter}
      isLoading={isLoading}
      noDataMessage="No complaints found"
      className="h-auto!"
    />
  );
}

