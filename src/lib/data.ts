import { AlignVerticalJustifyEnd, Store, ChartColumnIncreasing, NotebookTabs, LayoutDashboard } from 'lucide-react';
// menu items for sidebar
export const MenuItems = [
    {
        text: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        text: "Orders",
        href: "/dashboard/orders",
        icon: AlignVerticalJustifyEnd,
    },
    {
        text: "Listing",
        href: "/dashboard/listing",
        icon: NotebookTabs
    },
    {
        text: "Products",
        href: "/dashboard/products",
        icon: Store
    },
    {
        text: "Stats",
        href: "/dashboard/stats",
        icon: ChartColumnIncreasing,
    },
]