// OrderTableColumns.tsx

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useDeleteOrder } from "./useDeleteOrder";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";
import { Items, Order } from "@/lib/interfaces";

interface ActionCellProps {
    row: any;
}

// Action Cell Component
export const ActionCell: React.FC<ActionCellProps> = ({ row }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { handleDelete } = useDeleteOrder();

    const [isCustomerDialogOpen, setCustomerDialogOpen] = React.useState(false);
    const [isOrderDialogOpen, setOrderDialogOpen] = React.useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    const handleStatusChange = async (newStatus: string) => {
        // Update order status in Firebase
        const orderId = row.original.id;
        await updateOrderStatusInFirebase(orderId, newStatus);
    };

    return (
        <>
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => setCustomerDialogOpen(true)}>
                    Show Customer Details
                </Button>
                <Button variant="ghost" onClick={() => setOrderDialogOpen(true)}>
                    Show Order Details
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange("pending")}>
                            Set Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange("delivered")}>
                            Set Delivered
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange("canceled")}>
                            Set Canceled
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange("returned")}>
                            Set Returned
                        </DropdownMenuItem>
                        {/* Trigger for Delete Order Dialog */}
                        <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Order</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Customer Details Dialog */}
            <AlertDialog open={isCustomerDialogOpen} onOpenChange={setCustomerDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Customer Details</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        <p>Name: {row.original.orderDetails.fullName}</p>
                        <p>Phone Number: {row.original.orderDetails.phoneNumber}</p>
                        <p>Address: {row.original.orderDetails.address}</p>
                        <p>City: {row.original.orderDetails.city}</p>
                        <p>Province: {row.original.orderDetails.province}</p>
                        <p>Email: {row.original.orderDetails.email}</p>
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setCustomerDialogOpen(false)}>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Order Details Dialog */}
            <AlertDialog open={isOrderDialogOpen} onOpenChange={setOrderDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Order Details</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        {row.original.items.map((item: Items, index: number) => (
                            <div className="my-3" key={index}>
                                <p>Product Name: {item.name}</p>
                                <p>Color: {item.color}</p>
                                <p>Size: {item.size}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: {item.price}</p>
                                <Image src={item.image} alt={item.name} width={50} height={50} />
                            </div>
                        ))}
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOrderDialogOpen(false)}>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Order Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Order</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        Are you sure you want to delete this order? This action cannot be undone.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                handleDelete(row.original.id);
                                setDeleteDialogOpen(false);
                            }}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

// Update order status function
async function updateOrderStatusInFirebase(orderId: string, newStatus: string) {
    // Logic to update order status in Firebase
}

// Define the columns for the table
export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "Order ID",
    },
    {
        accessorKey: "orderDate",
        header: "Order Date",
        cell: ({ row }) => new Date(row.original.orderDate).toLocaleDateString(),
    },
    {
        accessorKey: "status",
        header: "Order Status",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionCell row={row} />,
    },
];
