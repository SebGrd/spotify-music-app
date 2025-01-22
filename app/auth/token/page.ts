"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TokenPage() {
    const router = useRouter();
    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const token = searchParams.get('token');
        const refreshToken = searchParams.get('refreshToken');
        if (token && refreshToken) {
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            router.push('/webplayer');
        }
    }, [router]);
    return null;
}