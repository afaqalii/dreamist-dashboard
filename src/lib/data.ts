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


// product size and quantity array 
export const sizeAndQuantityArray = [
    {
        string:"small",
        value: "s",
        quantity: 1,
    },
    {
        string:"medium",
        value: "m",
        quantity: 1,
    },
    {
        string:"large",
        value: "l",
        quantity: 1,
    },
    {
        string:"extra large",
        value: "xl",
        quantity: 1,
    },
    {
        string:"extra extra large",
        value: "xxl",
        quantity: 1,
    },
]