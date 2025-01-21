"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TokenPage() {
    const router = useRouter();
    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const token = searchParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            router.push('/webplayer');
        }
    }, [])
    return null;
}