import { useMemo, useState } from "react";
import DefaultTable, { type Column } from "./DefaultTable";
import { DefaultButton } from "@/components/input/DefaultButton";
import type { DistributorDataProps } from "@/assets/dataset/DistributorDataset";
import { distributorsData } from "@/assets/dataset/DistributorDataset";
import { useRouterUtils } from "@/utils/useRouterUtils";
import { RoutesConstant } from "@/utils/constant/RoutesConstant";
import InviteDistributorModal from "../modal/distributor/InviteDistributorModal";

interface DistributorsTableProps {
  isLoading?: boolean;
}

export default function DistributorsTable({
  isLoading = false,
}: DistributorsTableProps) {
  const router = useRouterUtils();
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [tierFilter, setTierFilter] = useState<string>("");
  const [regionFilterLabel, setRegionFilterLabel] = useState<string>("Region");
  const [tierFilterLabel, setTierFilterLabel] = useState<string>("Tier");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [ViewDistributorModal, setViewDistributorModal] = useState<boolean>(false);
  const [_viewDistributorData, setViewDistributorData] = useState<DistributorDataProps | null>(null);

  // Handle actions internally
  const handleInviteDistributor = () => {
    // Handle invite distributor action
    router.navigate(RoutesConstant.distributor.invite);
  };

  const handleViewDistributor = (distributor: DistributorDataProps) => {
    // Handle view distributor action
    console.log("View distributor:", distributor);
    setViewDistributorModal(true);
    setViewDistributorData(distributor);
  };

  // Filter data based on filters and search query
  const filteredData = useMemo(() => {
    let filtered = [...distributorsData];

    // Filter by region
    if (regionFilter && regionFilter !== "All Regions") {
      filtered = filtered.filter((item) => item.region === regionFilter);
    }

    // Filter by tier
    if (tierFilter && tierFilter !== "All Tiers") {
      filtered = filtered.filter((item) => item.tier === tierFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => {
        return (
          item.distributor.toLowerCase().includes(query) ||
          item.tier.toLowerCase().includes(query) ||
          item.region.toLowerCase().includes(query)
        );
      });
    }

    return filtered;
  }, [distributorsData, regionFilter, tierFilter, searchQuery]);

  const handleFilterChange = (filterId: string, value: string) => {
    if (filterId === "region") {
      setRegionFilter(value === "All Regions" ? "" : value);
      setRegionFilterLabel(value === "All Regions" ? "Region" : value);
    } else if (filterId === "tier") {
      setTierFilter(value === "All Tiers" ? "" : value);
      setTierFilterLabel(value === "All Tiers" ? "Tier" : value);
    }
  };

  const handleRemoveFilter = (filterId: string) => {
    if (filterId === "region") {
      setRegionFilter("");
      setRegionFilterLabel("Region");
    } else if (filterId === "tier") {
      setTierFilter("");
      setTierFilterLabel("Tier");
    }
  };

  // Get active filters for display
  const activeFilters = useMemo(() => {
    const filters: Record<string, string> = {};
    if (regionFilter) {
      filters.region = regionFilterLabel;
    }
    if (tierFilter) {
      filters.tier = tierFilterLabel;
    }
    return filters;
  }, [regionFilter, tierFilter, regionFilterLabel, tierFilterLabel]);

  // Get unique values for filters
  const tiers = useMemo(() => {
    return Array.from(new Set(distributorsData.map((d: DistributorDataProps) => d.tier)));
  }, [distributorsData]);

  const columns: Column<DistributorDataProps>[] = useMemo(() => [
    {
      header: "Distributor",
      accessor: "distributor",
      width: "180px",
      headerClassName: "text-left",
      cellClassName: "font-medium text-left",
    },
    {
      header: "Tier",
      accessor: "tier",
      width: "100px",
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
    {
      header: "Total Orders",
      accessor: "totalOrders",
      width: "110px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (value) => <span className="text-white light:text-[#171717] text-xs sm:text-sm">{String(value)}</span>,
    },
    {
      header: "Revenue",
      accessor: "revenue",
      width: "130px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (value) => (
        <span className="text-white light:text-[#171717] font-medium text-xs sm:text-sm">{String(value)}</span>
      ),
    },
    {
      header: "Last Order",
      accessor: "lastOrder",
      width: "120px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (value) => <span className="text-white light:text-[#171717] text-xs sm:text-sm">{String(value)}</span>,
    },
    {
      header: "Complaints",
      accessor: "complaints",
      width: "100px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (value) => <span className="text-white light:text-[#171717] text-xs sm:text-sm">{String(value)}</span>,
    },
    {
      header: "Status",
      accessor: "status",
      width: "90px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (value) => {
        const status = String(value);
        return (
          <span
            className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-light ${
              status === "Active"
                ? "bg-green-500/20 text-green-400"
                : "bg-gray-500/20 text-gray-400"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "",
      accessor: "distributor",
      width: "80px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (_value, row) => (
        <button
          onClick={() => handleViewDistributor(row)}
          className="tap-effect text-[#FBC02D] hover:underline text-xs sm:text-sm font-light"
        >
          View
        </button>
      ),
    },
  ], [handleViewDistributor, regionFilterLabel, tierFilterLabel, tiers]);

  const filters = useMemo(() => [
    {
      id: "region",
      label: regionFilterLabel,
      options: ["All Regions", "North", "South", "East", "West"],
      onChange: (value: string) => handleFilterChange("region", value),
    },
    {
      id: "tier",
      label: tierFilterLabel,
      options: ["All Tiers", ...tiers],
      onChange: (value: string) => handleFilterChange("tier", value),
    },
  ], [regionFilterLabel, tierFilterLabel, tiers]);

  const actionButton = useMemo(() => (
    <DefaultButton
      onClick={handleInviteDistributor}
      className="w-auto! px-6! py-2! h-auto! rounded-full! bg-[#FBC02D]! text-black! hover:bg-[#FBC02D]/90! tap-effect"
      label="Invite Distributor"
    />
  ), [handleInviteDistributor]);


  return (
    <>
      <InviteDistributorModal
        isOpen={ViewDistributorModal}
        onClose={() => setViewDistributorModal(false)}
        disableCloseOnInteractOutside={false}
        showCloseButton={true}
        className="w-full max-w-xs md:max-w-sm lg:max-w-xl!"
        onButtonClick={() => {}}
      />

      <DefaultTable
        columns={columns}
        data={filteredData}
        itemsPerPage={6}
        title="Distributor Table"
        showSearch={false}
        searchPlaceholder="Search distributors..."
        searchKeys={[]}
        filters={filters}
        actionButton={actionButton}
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
        onSearchChange={setSearchQuery}
        isLoading={isLoading}
        noDataMessage="No distributors found"
        className="h-auto!"
      />
    </>
  );
}
