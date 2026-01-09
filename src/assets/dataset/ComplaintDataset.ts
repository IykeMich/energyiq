export interface ComplaintDataProps extends Record<string, unknown> {
  id: string;
  distributor: string;
  orderNo: string;
  product: string;
  type: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Pending" | "In Review" | "Resolved" | "Closed" | "Escalated";
  submitted: string; // Date and time string
}

export const complaintsData: ComplaintDataProps[] = [
  {
    id: "COMP-001",
    distributor: "EastFuelLtd",
    orderNo: "ORD-IOO2",
    product: "Diesel 20L x 10",
    type: "Wrong Product",
    severity: "High",
    status: "In Review",
    submitted: "20 Nov 2025, 10:32 AM",
  },
  {
    id: "COMP-002",
    distributor: "WestEnergy Co",
    orderNo: "ORD-IOO5",
    product: "Petrol 20L x 15",
    type: "Quality Issue",
    severity: "Medium",
    status: "Pending",
    submitted: "21 Nov 2025, 02:15 PM",
  },
  {
    id: "COMP-003",
    distributor: "NorthFuel Services",
    orderNo: "ORD-IOO8",
    product: "Kerosene 10L x 20",
    type: "Delayed Delivery",
    severity: "High",
    status: "In Review",
    submitted: "21 Nov 2025, 09:45 AM",
  },
  {
    id: "COMP-004",
    distributor: "SouthGas Distributors",
    orderNo: "ORD-IOO3",
    product: "Diesel 20L x 8",
    type: "Missing Items",
    severity: "Critical",
    status: "Escalated",
    submitted: "22 Nov 2025, 11:20 AM",
  },
  {
    id: "COMP-005",
    distributor: "CentralOil Ltd",
    orderNo: "ORD-IOO7",
    product: "Petrol 20L x 12",
    type: "Wrong Product",
    severity: "Low",
    status: "Resolved",
    submitted: "22 Nov 2025, 03:30 PM",
  },
  {
    id: "COMP-006",
    distributor: "EastFuelLtd",
    orderNo: "ORD-IOO9",
    product: "Diesel 20L x 10",
    type: "Quality Issue",
    severity: "High",
    status: "In Review",
    submitted: "23 Nov 2025, 08:15 AM",
  },
  {
    id: "COMP-007",
    distributor: "WestEnergy Co",
    orderNo: "ORD-IOO4",
    product: "Kerosene 10L x 25",
    type: "Damaged Packaging",
    severity: "Medium",
    status: "Pending",
    submitted: "23 Nov 2025, 01:40 PM",
  },
  {
    id: "COMP-008",
    distributor: "NorthFuel Services",
    orderNo: "ORD-IOO6",
    product: "Petrol 20L x 18",
    type: "Delayed Delivery",
    severity: "Medium",
    status: "Resolved",
    submitted: "24 Nov 2025, 10:00 AM",
  },
  {
    id: "COMP-009",
    distributor: "SouthGas Distributors",
    orderNo: "ORD-IOO1",
    product: "Diesel 20L x 15",
    type: "Missing Items",
    severity: "Critical",
    status: "Escalated",
    submitted: "24 Nov 2025, 04:25 PM",
  },
  {
    id: "COMP-010",
    distributor: "CentralOil Ltd",
    orderNo: "ORD-IOO10",
    product: "Petrol 20L x 10",
    type: "Wrong Product",
    severity: "Low",
    status: "Closed",
    submitted: "25 Nov 2025, 09:10 AM",
  },
  // Adding more complaints to reach 100 total
  ...Array.from({ length: 90 }, (_, i) => {
    const distributors = [
      "EastFuelLtd",
      "WestEnergy Co",
      "NorthFuel Services",
      "SouthGas Distributors",
      "CentralOil Ltd",
      "PrimeFuel Solutions",
      "EliteEnergy Corp",
      "FastFuel Distributors",
    ];
    const products = [
      "Diesel 20L x 10",
      "Petrol 20L x 15",
      "Kerosene 10L x 20",
      "Diesel 20L x 8",
      "Petrol 20L x 12",
      "Kerosene 10L x 25",
      "Petrol 20L x 18",
      "Diesel 20L x 15",
    ];
    const types = [
      "Wrong Product",
      "Quality Issue",
      "Delayed Delivery",
      "Missing Items",
      "Damaged Packaging",
      "Billing Error",
      "Order Mismatch",
    ];
    const severities: ComplaintDataProps["severity"][] = ["Low", "Medium", "High", "Critical"];
    const statuses: ComplaintDataProps["status"][] = [
      "Pending",
      "In Review",
      "Resolved",
      "Closed",
      "Escalated",
    ];

    const day = (i % 28) + 26;
    const month = "Nov";
    const year = "2025";
    const hour = (i % 12) + 1;
    const minute = (i % 60).toString().padStart(2, "0");
    const period = i % 2 === 0 ? "AM" : "PM";

    return {
      id: `COMP-${String(i + 11).padStart(3, "0")}`,
      distributor: distributors[i % distributors.length],
      orderNo: `ORD-IOO${String(i + 11).padStart(3, "0")}`,
      product: products[i % products.length],
      type: types[i % types.length],
      severity: severities[i % severities.length],
      status: statuses[i % statuses.length],
      submitted: `${day} ${month} ${year}, ${hour}:${minute} ${period}`,
    };
  }),
];


