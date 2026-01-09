export interface EmployeeDataProps extends Record<string, unknown> {
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  lastLogin: string;
}

export const employeesData: EmployeeDataProps[] = [
  {
    name: "Segun Ajayi",
    email: "john.doe@example.com",
    department: "Executive",
    role: "Administrator",
    status: "Active",
    lastLogin: "2025-01-01",
  },
  {
    name: "Henry Olamide",
    email: "jane.doe@example.com",
    department: "Sales",
    role: "Sales Manager",
    status: "Inactive",
    lastLogin: "2025-01-01",
  },
  {
    name: "Daniel Kalu",
    email: "daniel.kalu@example.com",
    department: "Engineering",
    role: "Engineer",
    status: "Active",
    lastLogin: "2025-01-01",
  },
  {
    name: "Ugo Eze Chidera",
    email: "ugo.eze@example.com",
    department: "Engineering",
    role: "Engineer",
    status: "Active",
    lastLogin: "2025-01-01",
  },
  {
    name: "Anita Emeje Oge",
    email: "anita.emeje@example.com",
    department: "Marketing",
    role: "Marketing Manager",
    status: "Inactive",
    lastLogin: "2025-01-01",
  },
  {
    name: "Tunde Ogunleye",
    email: "tunde.ogunleye@example.com",
    department: "Finance",
    role: "Finance Manager",
    status: "Active",
    lastLogin: "2025-01-01",
  },
  {
    name: "Chioma Okafor",
    email: "chioma.okafor@example.com",
    department: "Marketing",
    role: "Marketing Manager",
    status: "Active",
    lastLogin: "2025-01-01",
  },
  {
    name: "Tunde Ogunleye",
    email: "tunde.ogunleye@example.com",
    department: "Marketing",
    role: "Marketing Assistant",
    status: "Active",
    lastLogin: "2025-01-01",
  },
  {
    name: "Emeka Okoye",
    email: "emeka.okoye@example.com",
    department: "Engineering",
    role: "Engineer",
    status: "Active",
    lastLogin: "2025-01-01",
  },
  {
    name: "Chinedu Okonkwo",
    email: "chinedu.okonkwo@example.com",
    department: "Customer Service",
    role: "Customer Service Representative",
    status: "Active",
    lastLogin: "2025-01-01",
  },
];