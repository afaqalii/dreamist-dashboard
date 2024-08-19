"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "@/components/ui/loader/loader";
import { useDispatch } from "react-redux";
import { resetProductStateValues } from "@/redux/ProductSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = usePathname();
    const [prevLocation, setPrevLocation] = useState(location);
    const dispatch = useDispatch();

    // Handle location changes and reset state if needed
    useEffect(() => {
        if (prevLocation === '/dashboard/products' && location !== '/dashboard/products') {
            dispatch(resetProductStateValues());
        }
        setPrevLocation(location);
    }, [location, prevLocation, dispatch]);

    // Check authentication status on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            router.replace('/login'); // Use replace to avoid adding to history stack
        }
    }, [router]);

    // If not authenticated, show loading spinner
    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
