import React, { useState } from "react";
import DefaultTable, { type Column } from "./DefaultTable";
import { DefaultButton } from "@/components/input/DefaultButton";
import type { EmployeeDataProps } from "@/assets/dataset/EmployeeDataset";
import { employeesData } from "@/assets/dataset/EmployeeDataset";
import EmployeeImage from "@/assets/image/employee-image.png"
import AddEmployeeModal from "../modal/employee/AddEmployeeModal";

interface EmployeesTableProps {
  isLoading?: boolean;
}

export default function EmployeesTable({
  isLoading = false,
}: EmployeesTableProps) {
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [departmentFilterLabel, setDepartmentFilterLabel] = useState<string>("All Department");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [roleFilterLabel, setRoleFilterLabel] = useState<string>("All Roles");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [addEmployeeModal, setAddEmployeeModal] = useState<boolean>(false);
  // Handle actions internally
  const handleAddEmployee = () => {
    setAddEmployeeModal(true);
  };

  const handleEditEmployee = (employee: EmployeeDataProps) => {
    // Handle edit employee action
    console.log("Edit employee:", employee);
    // TODO: Implement edit employee logic (e.g., navigate to edit page)
  };

  const handleDeleteEmployee = (employee: EmployeeDataProps) => {
    // Handle delete employee action
    console.log("Delete employee:", employee);
    // TODO: Implement delete employee logic (e.g., navigate to delete page)
  };

  // Filter data based on filters and search query
  const filteredData = React.useMemo(() => {
    let filtered = [...employeesData];

    // Filter by region
    if (departmentFilter && departmentFilter !== "All Departments") {
      filtered = filtered.filter((item) => item.department === departmentFilter);
    }

    if (roleFilter && roleFilter !== "All Roles") {
        filtered = filtered.filter((item) => item.role === roleFilter )
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => {
        return (
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          item.department.toLowerCase().includes(query) ||
          item.role.toLowerCase().includes(query) ||
          item.status.toLowerCase().includes(query) ||
          item.lastLogin.toLowerCase().includes(query)
        );
      });
    }

    return filtered;
  }, [employeesData, departmentFilter, roleFilter, searchQuery]);

  const handleFilterChange = (filterId: string, value: string) => {
    if (filterId === "department") {
      setDepartmentFilter(value === "All Departments" ? "" : value);
      setDepartmentFilterLabel(value === "All Departments" ? "All Departments" : value);
    }
    if (filterId === "role") {
      setRoleFilter(value === "All Roles" ? "" : value);
      setRoleFilterLabel(value === "All Roles" ? "All Roles" : value);
    }
  };

  const handleRemoveFilter = (filterId: string) => {
    if (filterId === "department") {
      setDepartmentFilter("");
      setDepartmentFilterLabel("All Departments");
    }
    if (filterId === "role") {
      setRoleFilter("");
      setRoleFilterLabel("All Roles");
    }
  };

  // Get active filters for display
  const activeFilters = React.useMemo(() => {
    const filters: Record<string, string> = {};
    if (departmentFilter) {
      filters.department = departmentFilterLabel;
    }
    if (roleFilter) {
      filters.role = roleFilterLabel;
    }
    return filters;
  }, [departmentFilter, departmentFilterLabel]);

  // Get unique values for filters
  const departments = React.useMemo(() => {
    return Array.from(new Set(employeesData.map((d: EmployeeDataProps) => d.department)));
  }, [employeesData]);

  const roles = React.useMemo(() => {
    return Array.from(new Set(employeesData.map((d: EmployeeDataProps) => d.role)));
  }, [employeesData]);

  const columns: Column<EmployeeDataProps>[] = [
    {
      header: "Employee Name",
      accessor: "name",
      width: "100px",
      headerClassName: "text-left",
      cellClassName: "font-medium text-left",
    //   render name and email in the same cell in column
      render: (_value, row) => 
        <div className={` flex items-center justify-start gap-x-2`}>
          <img src={EmployeeImage} alt="Employee Image" className="size-8 rounded-full object-cover" />
      <div className="flex flex-col items-start justify-start">
        <p className="text-white light:text-[#171717] text-xs sm:text-sm font-light">{String(row.name)}</p>
        <p className="text-white light:text-[#171717] md:text-[11.6px] sm:text-[10px] font-light">{String(row.email)}</p>
      </div>
        </div>
    },
    {
      header: "Role",
      accessor: "role",
      width: "100px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (_value, row) => <span className="text-white light:text-[#171717] text-xs sm:text-sm">{String(row.role)}</span>,
    },
    {
      header: "Department",
      accessor: "department",
      width: "110px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (_value, row) => <span className="text-white light:text-[#171717] text-xs sm:text-sm">{String(row.department)}</span>,
    },
    {
      header: "Status",
      accessor: "status",
      width: "100px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (_value, row) => 
      <span className={` ${row.status === "Active" ? "text-[#388E3C]" : "text-[#D30A0A]"} light:text-[#171717] text-xs sm:text-sm `}>{String(row.status)}</span>
    },
    {
      header: "Last Active",
      accessor: "lastLogin",
      width: "120px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (_value, row) => <span className="text-white light:text-[#171717] text-xs sm:text-sm">Today, {String(row.lastLogin)}</span>,
    },
    {
      header: "Actions",
      accessor: "id",
      width: "80px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (_value, row) => (
        <div className="flex items-center justify-center gap-x-1">
        <button
          onClick={() => handleEditEmployee(row)}
          className="text-[#FBC02D] hover:underline text-xs sm:text-sm font-light tap-effect"
          >
          Edit
        </button>
        <p className="text-[#FBC02D] light:text-[#171717] text-xs sm:text-sm">/</p>
        <button
          onClick={() => handleDeleteEmployee(row)}
          className="text-[#FBC02D] hover:underline text-xs sm:text-sm font-light tap-effect"
          >
          Delete
        </button>
    </div>
      ),
    },
  ];

  const filters = [
    {
      id: "department",
      label: departmentFilterLabel,
      options: ["All Departments", ...departments],
      onChange: (value: string) => handleFilterChange("department", value),
    },
    {
      id: "role",
      label: roleFilterLabel,
      options: ["All Roles", ...roles],
      onChange: (value: string) => handleFilterChange("role", value),
    },
  ];

  const actionButton = (
    <DefaultButton
      onClick={handleAddEmployee}
      className="w-auto! px-6! py-2! h-auto! rounded-full! bg-[#FBC02D]! text-black! hover:bg-[#FBC02D]/90! tap-effect"
      label="Add Employee"
    />
  );

  return (
    <>
    <AddEmployeeModal
      isOpen={addEmployeeModal}
      onClose={() => setAddEmployeeModal(false)}
      disableCloseOnInteractOutside={false}
      showCloseButton={true}
      className="w-full max-w-xs md:max-w-sm lg:max-w-xl!"
      onButtonClick={() => {}}
    />
    <DefaultTable
      columns={columns}
      data={filteredData}
      itemsPerPage={5}
      title="Employee List"
      showSearch={false}
      searchPlaceholder="Search employees..."
      searchKeys={[]}
      filters={filters}
      actionButton={actionButton}
      activeFilters={activeFilters}
      onRemoveFilter={handleRemoveFilter}
      onSearchChange={setSearchQuery}
      isLoading={isLoading}
      noDataMessage="No employees found"
      className="h-auto!"
    />
    </>
  );
}
