export interface DistributorDataProps extends Record<string, unknown> {
  distributor: string;
  tier: string;
  totalOrders: number;
  revenue: string;
  lastOrder: string;
  complaints: number;
  status: string;
  region: string;
}

  export const distributorsData: DistributorDataProps[] = [
    {
      distributor: "StarLink Oil",
      tier: "Gold",
      totalOrders: 23,
      revenue: "₦1,040,000",
      lastOrder: "04 Nov 2025",
      complaints: 1,
      status: "Active",
      region: "East",
    },
    {
      distributor: "PetroMax Energy",
      tier: "Silver",
      totalOrders: 18,
      revenue: "₦850,000",
      lastOrder: "03 Nov 2025",
      complaints: 0,
      status: "Active",
      region: "West",
    },
    {
      distributor: "GasLink Distributor",
      tier: "Gold",
      totalOrders: 31,
      revenue: "₦1,450,000",
      lastOrder: "05 Nov 2025",
      complaints: 2,
      status: "Active",
      region: "North",
    },
    {
      distributor: "FuelPro Solutions",
      tier: "Bronze",
      totalOrders: 12,
      revenue: "₦580,000",
      lastOrder: "02 Nov 2025",
      complaints: 0,
      status: "Active",
      region: "South",
    },
    {
      distributor: "EnergyHub Ltd",
      tier: "Gold",
      totalOrders: 28,
      revenue: "₦1,320,000",
      lastOrder: "04 Nov 2025",
      complaints: 1,
      status: "Active",
      region: "North",
    },
    {
      distributor: "OilConnect Inc",
      tier: "Silver",
      totalOrders: 15,
      revenue: "₦720,000",
      lastOrder: "01 Nov 2025",
      complaints: 0,
      status: "Active",
      region: "South",
    },
  ];