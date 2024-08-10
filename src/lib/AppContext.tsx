'use client';

import store from '@/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { UIState } from './interfaces';
import { Toaster } from "@/components/ui/toaster";

interface AppContextProps {
    uiState: UIState;
    toggleSidebar: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [uiState, setUIState] = useState<UIState>({
        isSidebarOpen: true, // Default to true for consistent SSR output
    });

    const queryClient = new QueryClient();

    useEffect(() => {
        // Run only on the client side
        const handleResize = () => {
            setUIState({
                isSidebarOpen: window.innerWidth >= 768,
            });
        };

        // Set the initial state based on the current window width
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setUIState((prevState) => ({
            ...prevState,
            isSidebarOpen: !prevState.isSidebarOpen,
        }));
    };

    // Render without checking for window size during SSR
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <AppContext.Provider value={{ uiState, toggleSidebar }}>
                    {children}
                </AppContext.Provider>
            </Provider>
            <ReactQueryDevtools />
            <Toaster />
        </QueryClientProvider>
    );
};

export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};