import { useMutation, useQueryClient } from "@tanstack/react-query";
import { remove, ref } from "firebase/database";
import { database } from "@/firebase"; // Adjust the path based on your project structure

// Define the mutation function
const deleteOrder = async (id: string) => {
    await remove(ref(database, `orders/${id}`));
};

// Custom hook for the delete mutation
export const useDeleteOrder = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteOrder,
        onSuccess: () => {
            // Invalidate and refetch the products query
            queryClient.invalidateQueries({
                queryKey: ['orders'],
            });
        },
        onError: (error) => {
            console.error("Error deleting order:", error);
            alert("Failed to delete order");
        },
    });

    // Handle delete action
    const handleDelete = (id: string) => {
        mutation.mutate(id);
    };

    return { handleDelete, isDeleting: mutation.status === 'pending' };
};
