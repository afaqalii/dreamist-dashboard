import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Product } from "@/lib/interfaces"
import { editProductForm } from "@/redux/ProductSlice"
import { ColumnDef } from "@tanstack/react-table"
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react"
import Image from 'next/image'
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"

export const columns: ColumnDef<Product>[] = [
    {
        id: "productImage",
        header: "Image",
        cell: ({ row }) => {
            const article = row.original.articles[0]
            const imageUrl = article?.images?.[0]

            return (
                imageUrl ? <Image src={imageUrl} alt="Product Image" width={50} height={50} /> : "No Image"
            )
        },
    },
    {
        accessorKey: "productName",
        header: "Product Name",
    },
    {
        accessorKey: "productCategory",
        header: "Product Category",
    },
    {
        accessorKey: "productGender",
        header: "Gender",
    },
    {
        accessorKey: "productPrice",
        header: () => <div className="text-right">Actual Price</div>,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("productPrice"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "salePercentage",
        header: () => <div className="text-right">Sale %</div>,
        cell: ({ row }) => {
            const salePercentage = row.getValue<number>("salePercentage")

            return <div className="text-right font-medium">{salePercentage}%</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const router = useRouter();
            const dispatch = useDispatch();
            const handleEdit = () => {
                dispatch(editProductForm(row.original))
                router.push("/dashboard/products")
            }
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleEdit} className="py-2">
                            <Edit2 className="mr-2 h-4 w-4" />
                            <span>Edit Product</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="py-2">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Product</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
