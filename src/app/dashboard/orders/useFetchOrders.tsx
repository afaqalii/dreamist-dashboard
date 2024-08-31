import { database } from '@/firebase';
import { ref, get } from 'firebase/database';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/lib/interfaces';

const fetchOrders = async (): Promise<Product[]> => {
    const dbRef = ref(database, '/orders'); // Update this path to match your Firebase structure
    const snapshot = await get(dbRef);

    if (!snapshot.exists()) {
        throw new Error('No data available');
    }

    return Object.values(snapshot.val()) as Product[];
};

export const useFetchOrders = () => {
    return useQuery<Product[]>({
        queryKey: ['orders'],
        queryFn: fetchOrders,
    });
};
