export interface OrderDataProps extends Record<string, unknown> {
  id: string;
  date: string;
  distributor: string;
  items: number;
  amount: string;
  status: "Pending" | "Approved" | "Rejected" | "Delivered" | "Dispatched" | "Cancelled";
  payment: "Pending" | "Paid" | "Failed";
}

// Helper function to generate order data
function generateOrderData(startIndex: number, count: number): OrderDataProps[] {
  const distributors = [
    "Zenith Traders (Silver)",
    "Ideal Supplies (Bronze)",
    "Rapid Logistics (Gold)",
    "Elite Distributors (Gold)",
    "Fast Track Energy (Silver)",
    "Prime Oil Services (Gold)",
    "Global Energy Hub (Silver)",
    "Mega Fuel Corp (Bronze)",
    "Premium Distributors (Gold)",
    "Swift Oil Traders (Silver)",
  ];

  const payments: OrderDataProps["payment"][] = ["Pending", "Paid", "Failed"];

  return Array.from({ length: count }, (_, i) => {
    const baseIndex = startIndex + i;
    const day = (i % 28) + 8;
    const month = "Dec";
    const year = "2025";
    
    // Distribute statuses to match counts: Pending: 20, Approved: 10, Rejected: 10, Delivered: 100, Dispatched: 100, Cancelled: 20
    let status: OrderDataProps["status"];
    const globalIndex = startIndex - 21 + i; // Adjust for the 20 initial items
    if (globalIndex < 20) {
      status = "Pending";
    } else if (globalIndex < 30) {
      status = "Approved";
    } else if (globalIndex < 40) {
      status = "Rejected";
    } else if (globalIndex < 140) {
      status = "Delivered";
    } else if (globalIndex < 240) {
      status = "Dispatched";
    } else {
      status = "Cancelled";
    }

    return {
      id: `ORD-${String(baseIndex).padStart(3, "0")}`,
      date: `${String(day).padStart(2, "0")}-${month}-${year}`,
      distributor: distributors[i % distributors.length],
      items: Math.floor(Math.random() * 8) + 1,
      amount: `${Math.floor(Math.random() * 1500000 + 500000).toLocaleString()}`,
      status,
      payment: payments[i % payments.length] as OrderDataProps["payment"],
    };
  });
}

export const ordersData: OrderDataProps[] = [
  {
    id: "ORD-001",
    date: "18-Nov-2025",
    distributor: "Zenith Traders (Silver)",
    items: 3,
    amount: "1,250,000",
    status: "Approved",
    payment: "Pending",
  },
  {
    id: "ORD-002",
    date: "19-Nov-2025",
    distributor: "Ideal Supplies (Bronze)",
    items: 6,
    amount: "1,150,000",
    status: "Dispatched",
    payment: "Paid",
  },
  {
    id: "ORD-003",
    date: "20-Nov-2025",
    distributor: "Rapid Logistics (Gold)",
    items: 6,
    amount: "1,150,000",
    status: "Pending",
    payment: "Pending",
  },
  {
    id: "ORD-004",
    date: "21-Nov-2025",
    distributor: "Zenith Traders (Silver)",
    items: 4,
    amount: "950,000",
    status: "Delivered",
    payment: "Paid",
  },
  {
    id: "ORD-005",
    date: "22-Nov-2025",
    distributor: "Elite Distributors (Gold)",
    items: 2,
    amount: "800,000",
    status: "Rejected",
    payment: "Failed",
  },
  {
    id: "ORD-006",
    date: "23-Nov-2025",
    distributor: "Fast Track Energy (Silver)",
    items: 5,
    amount: "1,100,000",
    status: "Approved",
    payment: "Paid",
  },
  {
    id: "ORD-007",
    date: "24-Nov-2025",
    distributor: "Prime Oil Services (Gold)",
    items: 8,
    amount: "1,800,000",
    status: "Dispatched",
    payment: "Pending",
  },
  {
    id: "ORD-008",
    date: "25-Nov-2025",
    distributor: "Global Energy Hub (Silver)",
    items: 3,
    amount: "750,000",
    status: "Delivered",
    payment: "Paid",
  },
  {
    id: "ORD-009",
    date: "26-Nov-2025",
    distributor: "Mega Fuel Corp (Bronze)",
    items: 7,
    amount: "1,350,000",
    status: "Pending",
    payment: "Pending",
  },
  {
    id: "ORD-010",
    date: "27-Nov-2025",
    distributor: "Premium Distributors (Gold)",
    items: 4,
    amount: "1,000,000",
    status: "Cancelled",
    payment: "Failed",
  },
  {
    id: "ORD-011",
    date: "28-Nov-2025",
    distributor: "Swift Oil Traders (Silver)",
    items: 6,
    amount: "1,200,000",
    status: "Approved",
    payment: "Paid",
  },
  {
    id: "ORD-012",
    date: "29-Nov-2025",
    distributor: "Apex Energy Solutions (Gold)",
    items: 9,
    amount: "2,100,000",
    status: "Dispatched",
    payment: "Paid",
  },
  {
    id: "ORD-013",
    date: "30-Nov-2025",
    distributor: "Zenith Traders (Silver)",
    items: 2,
    amount: "600,000",
    status: "Delivered",
    payment: "Paid",
  },
  {
    id: "ORD-014",
    date: "01-Dec-2025",
    distributor: "Ideal Supplies (Bronze)",
    items: 5,
    amount: "1,050,000",
    status: "Rejected",
    payment: "Failed",
  },
  {
    id: "ORD-015",
    date: "02-Dec-2025",
    distributor: "Rapid Logistics (Gold)",
    items: 7,
    amount: "1,400,000",
    status: "Pending",
    payment: "Pending",
  },
  {
    id: "ORD-016",
    date: "03-Dec-2025",
    distributor: "Elite Distributors (Gold)",
    items: 3,
    amount: "850,000",
    status: "Approved",
    payment: "Pending",
  },
  {
    id: "ORD-017",
    date: "04-Dec-2025",
    distributor: "Fast Track Energy (Silver)",
    items: 4,
    amount: "980,000",
    status: "Dispatched",
    payment: "Paid",
  },
  {
    id: "ORD-018",
    date: "05-Dec-2025",
    distributor: "Prime Oil Services (Gold)",
    items: 6,
    amount: "1,300,000",
    status: "Delivered",
    payment: "Paid",
  },
  {
    id: "ORD-019",
    date: "06-Dec-2025",
    distributor: "Global Energy Hub (Silver)",
    items: 8,
    amount: "1,650,000",
    status: "Cancelled",
    payment: "Failed",
  },
  {
    id: "ORD-020",
    date: "07-Dec-2025",
    distributor: "Mega Fuel Corp (Bronze)",
    items: 2,
    amount: "550,000",
    status: "Approved",
    payment: "Paid",
  },
  // Adding more orders to match the counts in the image
  // All: 150, Pending: 20, Approved: 10, Rejected: 10, Delivered: 100, Dispatched: 100, Cancelled: 20
  // For demo purposes, we'll create a representative sample. In production, this would come from an API.
  ...generateOrderData(21, 130),
];
