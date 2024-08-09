import { database } from '@/firebase';
import { ref, get } from 'firebase/database';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/lib/interfaces';

const fetchProducts = async (): Promise<Product[]> => {
    const dbRef = ref(database, '/products'); // Update this path to match your Firebase structure
    const snapshot = await get(dbRef);

    if (!snapshot.exists()) {
        throw new Error('No data available');
    }

    return Object.values(snapshot.val()) as Product[];
};


export const useProducts = () => {
    return useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
};
