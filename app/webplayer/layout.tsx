"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import WebPlayback from "../../components/spotify/WebPlayback";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import StoreProvider from "@/store/store-provider";
import { SpotifyPlayerProvider } from "../contexts/SpotifyPlayer";
import getAndSetRefreshToken from "@/actions/getAndSetRefreshToken";
import AppHeader from "@/components/layout/AppHeader";

const queryClient = new QueryClient();


export default function WebPlayerLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return router.push('/');
        }
    }, [router]);

    useEffect(() => {
        const abortController = new AbortController();
        const refreshing = setInterval(() => {
            getAndSetRefreshToken();
        }, 1000 * 50 * 20, abortController.signal);
        return () => {
            clearInterval(refreshing);
        }
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
            <StoreProvider>
                <SpotifyPlayerProvider>
                    <SidebarProvider>
                        <AppSidebar />
                        <div className="grid grow grid-rows-[auto,1fr,105px] h-screen">
                            <AppHeader />
                            <main className="bg-background max-h-full overflow-y-auto">
                                {children}
                            </main>
                            <footer className="bg-background border-t border-border">
                                <WebPlayback />
                            </footer>
                        </div>
                    </SidebarProvider>
                </SpotifyPlayerProvider>
            </StoreProvider>
        </QueryClientProvider>
    )
}