import * as React from "react";
import { X, Search } from "lucide-react";
import { DefaultInput } from "@/components/input/DefaultInput";
import FilterDropdown from "@/components/shared/FilterDropdown";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  width?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  cellClassName?: string;
  headerClassName?: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  options: string[];
  onChange: (value: string) => void;
  defaultValue?: string;
}

interface DefaultTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  itemsPerPage?: number;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  filters?: FilterConfig[];
  showSearch?: boolean;
  isLoading?: boolean;
  noDataMessage?: string;
  showPagination?: boolean;
  className?: string;
  loadingMessage?: string;
  title?: string;
  actionButton?: React.ReactNode;
  activeFilters?: Record<string, string>;
  onRemoveFilter?: (filterId: string) => void;
}

const DefaultTable = <T extends Record<string, unknown>>({
  columns,
  data,
  itemsPerPage = 10,
  onSearchChange,
  searchPlaceholder = "Search...",
  searchKeys = [],
  filters = [],
  showSearch = false,
  isLoading = false,
  noDataMessage = "No Data Found",
  showPagination = true,
  className = "",
  loadingMessage = "Loading data...",
  title,
  actionButton,
  activeFilters = {},
  onRemoveFilter,
}: DefaultTableProps<T>) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [filterValues, setFilterValues] = React.useState<Record<string, string>>({});

  // Safeguard against undefined or null data
  const safeData = data || [];

  // Filter data based on search query
  const filteredData =
    searchQuery && searchKeys.length > 0
      ? safeData.filter((row) =>
          searchKeys.some((key) => {
            const value = row[key];
            return String(value).toLowerCase().includes(searchQuery.toLowerCase());
          })
        )
      : safeData;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = showPagination ? (currentPage - 1) * itemsPerPage : 0;
  const endIndex = showPagination ? startIndex + itemsPerPage : filteredData.length;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (onSearchChange) {
      onSearchChange(query);
    }
  };

  const handleFilterChange = (filterId: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [filterId]: value }));
    const filter = filters.find((f) => f.id === filterId);
    if (filter) {
      filter.onChange(value);
    }
  };

  const handleRemoveFilter = (filterId: string) => {
    setFilterValues((prev) => {
      const newValues = { ...prev };
      delete newValues[filterId];
      return newValues;
    });
    const filter = filters.find((f) => f.id === filterId);
    if (filter) {
      filter.onChange("");
    }
    if (onRemoveFilter) {
      onRemoveFilter(filterId);
    }
  };

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  // Get active filter labels
  const activeFilterLabels = React.useMemo(() => {
    const labels: Record<string, string> = {};
    filters.forEach((filter) => {
      const value = filterValues[filter.id] || activeFilters[filter.id];
      if (value) {
        const option = filter.options.find((opt) => opt === value);
        labels[filter.id] = option || filter.label;
      }
    });
    return labels;
  }, [filterValues, activeFilters, filters]);

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden">
      {/* Top Bar: Filters/Search on left, Action Button on right - OUTSIDE the card */}
      <div className="mb-4 sm:mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 w-full">
        {/* Left Section: Filter By with pills and Search */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 flex-1">
          {/* Filter By section */}
          {filters.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
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
              {/* Filters - Always render in fixed order */}
              {filters.map((filter) => {
                const isActive = !!activeFilterLabels[filter.id];
                const activeLabel = activeFilterLabels[filter.id];
                
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
                      value={filterValues[filter.id] || filter.defaultValue}
                      onValueChange={(value) => handleFilterChange(filter.id, value)}
                    />
                  );
                }
              })}
            </div>
          )}

          {/* Search Input */}
          {showSearch && (
            <div className="w-full lg:w-auto">
              <DefaultInput
                leftIcon={<Search className="w-4 h-4 text-gray-400" />}
                leftIconSpace={8}
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                minClassName="lg:w-[300px] w-full"
                className="h-[40px] bg-[#27272A] light:bg-white border-gray-600 light:border-gray-300 text-white light:text-[#171717]"
              />
            </div>
          )}
        </div>

        {/* Right Section: Action Button/ReactNode */}
        {actionButton && <div className="shrink-0">{actionButton}</div>}
      </div>

      {/* Card Container - Everything inside: Title, Table, Pagination */}
      <div className="bg-[#6161611A] light:bg-white rounded-[18px] shadow-sm p-4 sm:p-6 w-full overflow-hidden">
        {/* Table Title - Inside the card */}
        {title && (
          <div className="mb-4 sm:mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-[#FBC02D] rounded"></div>
            <h3 className="text-base sm:text-lg font-semibold text-white light:text-[#171717]">
              {title}
            </h3>
          </div>
        )}

        {/* Table Container - Inside the card with responsive overflow */}
        <div className="w-full overflow-x-auto overflow-y-visible">
          <div className={`relative ${className || "min-h-[400px]"}`}>
            <table className="w-full table-auto border-separate border-spacing-0">
              {/* Table Header - Rounded pill/capsule shape */}
              <thead>
                <tr>
                  {columns.map((col, idx) => {
                    const isFirst = idx === 0;
                    const isLast = idx === columns.length - 1;
                    return (
                      <th
                        key={idx}
                        style={{ width: col.width }}
                        className={`px-4 py-3 ${
                          col.headerClassName || ""
                        } text-xs md:text-sm font-semibold text-white light:text-[#171717] tracking-[1px] whitespace-nowrap ${
                          idx === 0 ? "text-left" : "text-center"
                        }  ${
                          isFirst 
                            ? "rounded-l-full border-t border-b border-l border-r-0" 
                            : isLast 
                            ? "rounded-r-full border-t border-b border-r border-l-0" 
                            : "border-t border-b border-l-0 border-r-0"
                        } border-[#616161B2] light:border-[#D4D4D4]`}
                      >
                        {col.header}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-20 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FBC02D]!"></div>
                        <p className="text-sm text-gray-400 light:text-gray-500">
                          {loadingMessage}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : currentData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-12 sm:py-20 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <svg
                          className="w-16 h-16 text-gray-400 light:text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <div>
                          <p className="text-base font-medium text-white light:text-gray-900">
                            {noDataMessage}
                          </p>
                          <p className="text-sm text-gray-400 light:text-gray-500 mt-1">
                            {searchQuery
                              ? "Try adjusting your search or filters"
                              : "No records to display"}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentData.map((row, rowIdx) => {
                    const actualIndex = startIndex + rowIdx;
                    return (
                      <tr
                        key={actualIndex}
                        className="border-gray-600/50 light:border-gray-200"
                      >
                        {columns.map((col, colIdx) => {
                          const value = row[col.accessor];
                          return (
                            <td
                              key={colIdx}
                              className={`px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white light:text-gray-900 ${
                                col.cellClassName || ""
                              } ${colIdx === 0 ? "text-left" : "text-center"}`}
                            >
                              {col.render ? col.render(value, row) : String(value)}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        {/* Pagination - Inside the card */}
        {showPagination && (
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 w-full overflow-x-auto">
            <div className="text-sm text-white/70 light:text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of{" "}
              {filteredData.length} Entries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`tap-effect px-3 py-0.5 rounded-md text-xs font-normal transition-colors border ${
                  currentPage === 1
                    ? "border-[#FBC02D]/50 text-[#FBC02D]/50 cursor-not-allowed bg-transparent"
                    : "border-[#FBC02D] text-black bg-[#FBC02D]"
                }`}
              >
                Prev
              </button>

              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 text-sm text-white light:text-gray-600"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`tap-effect px-3 py-0.5 rounded-md text-xs font-normal transition-colors ${
                      currentPage === page
                        ? "bg-[#FBC02D] text-black"
                        : "text-white light:text-[#171717] hover:text-[#FBC02D] bg-transparent"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`tap-effect px-3 py-0.5 rounded-md text-xs font-normal transition-colors border ${
                  currentPage === totalPages
                    ? "border-[#FBC02D]/50 text-[#FBC02D]/50 cursor-not-allowed bg-transparent"
                    : "border-[#FBC02D] text-black bg-[#FBC02D]"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default DefaultTable;
