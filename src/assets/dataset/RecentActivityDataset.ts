export interface RecentActivityDatasetProps extends Record<string, unknown> {
    status: string;
    title: string;
    description: string;
    timestamp: string;
}

export const recentActivityDataset: RecentActivityDatasetProps[] = [
    { status: "error", title: "New PO Received - PetroMax Energy:", description: "PO #2387 for 25,000L PMS.", timestamp: "2 hours ago" },
    { status: "success", title: "PetroMax Energy placed new order- PO 234# for 25,00L.", description: "PetroMax Energy placed new order- PO 234# for 25,00L.", timestamp: "2 hours ago" },
    { status: "success", title: "GasLink Distributor Tier upgraded to Gold:", description: "Distributor Tier upgraded to Gold...", timestamp: "5 hours ago" },
    { status: "error", title: "Complaint #C-2847 raised:", description: "Complaint #C-2847 raised...", timestamp: "1 day ago" },
    { status: "success", title: "New Distributor completed onboarding:", description: "New Distributor completed onboarding", timestamp: "2 days ago" },
    { status: "error", title: "PetroMax Energy placed new order:", description: "PetroMax Energy placed new order...", timestamp: "2 hours ago" },
    { status: "success", title: "GasLink Distributor Tier upgraded to Gold:", description: "Distributor Tier upgraded to Gold...", timestamp: "5 hours ago" },
    { status: "error", title: "Complaint #C-2847 raised:", description: "Complaint #C-2847 raised...", timestamp: "1 day ago" },
    { status: "success", title: "New Distributor completed onboarding:", description: "New Distributor completed onboarding", timestamp: "2 days ago" },
  ];