import { database } from '@/firebase';
import { ref, get } from 'firebase/database';
import { useQuery } from '@tanstack/react-query';
import { Order } from '@/lib/interfaces';

const fetchOrders = async (): Promise<Order[]> => {
    const dbRef = ref(database, '/orders'); // Update this path to match your Firebase structure
    const snapshot = await get(dbRef);

    if (!snapshot.exists()) {
        throw new Error('No data available');
    }

    return Object.values(snapshot.val()) as Order[];
};

export const useFetchOrders = () => {
    return useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: fetchOrders,
    });
};
