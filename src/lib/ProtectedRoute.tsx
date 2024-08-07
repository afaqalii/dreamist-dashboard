"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "@/components/ui/loader/loader";
import { useDispatch } from "react-redux";
import { resetProductStateValues } from "@/redux/ProductSlice";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = usePathname();
    const [prevLocation, setPrevLocation] = useState(location);
    const dispatch = useDispatch();
    useEffect(() => {
        if (prevLocation === '/dashboard/products' && location !== '/dashboard/products') {
            dispatch(resetProductStateValues()); // Replace 'yourAction' with the actual action you want to dispatch
        }

        setPrevLocation(location);
    }, [location, prevLocation, dispatch]);
    
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         setIsAuthenticated(true);
    //     } else {
    //         setIsAuthenticated(false);
    //         router.push('/login');
    //     }
    //     setLoading(false);
    // }, [router]);

    // if (!isAuthenticated) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen">
    //             <Spinner />
    //         </div>
    //     );
    // }

    return <>{children}</>;
};

export default ProtectedRoute;
