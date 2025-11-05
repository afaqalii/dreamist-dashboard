import { AlignVerticalJustifyEnd, Store, ChartColumnIncreasing, NotebookTabs, LayoutDashboard } from 'lucide-react';
// menu items for sidebar
export const MenuItems = [
    {
        text: "Dashboard",
        href: "/",
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
        string: "small",
        value: "s",
        quantity: 1,
    },
    {
        string: "medium",
        value: "m",
        quantity: 1,
    },
    {
        string: "large",
        value: "l",
        quantity: 1,
    },
    {
        string: "extra large",
        value: "xl",
        quantity: 1,
    },
    {
        string: "extra extra large",
        value: "xxl",
        quantity: 1,
    },
]
export const sizeAndQuantityArrayForPants = [
    {
        string: "30",
        value: "30",
        quantity: 1,
    },
    {
        string: "32",
        value: "32",
        quantity: 1,
    },
    {
        string: "34",
        value: "34",
        quantity: 1,
    },
    {
        string: "36",
        value: "36",
        quantity: 1,
    },
    {
        string: "38",
        value: "38",
        quantity: 1,
    },
]