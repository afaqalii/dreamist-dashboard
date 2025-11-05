import { useMutation, useQueryClient } from "@tanstack/react-query";
import { remove, ref } from "firebase/database";
import { database } from "@/firebase"; // Adjust the path based on your project structure

// Define the mutation function
const deleteProduct = async (id: string) => {
    await remove(ref(database, `products/${id}`));
};

// Custom hook for the delete mutation
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            // Invalidate and refetch the products query
            queryClient.invalidateQueries({
                queryKey: ['products'],
            });
        },
        onError: (error) => {
            console.error("Error deleting product:", error);
            alert("Failed to delete product");
        },
    });

    // Handle delete action
    const handleDelete = (id: string) => {
        mutation.mutate(id);
    };

    return { handleDelete, isDeleting: mutation.status === 'pending' };
};
