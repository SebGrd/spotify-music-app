"use client"

export default async function getAndSetRefreshToken() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!token || !refreshToken) {
        throw new Error('Missing token, refreshToken');
    }
    try {
        const res = await fetch('/api/auth/refresh_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh_token: refreshToken,
            }),
        })
        const data = await res.json();
        localStorage.setItem('token', data.access_token);
    } catch {
        throw new Error('Failed to refresh token');
    }
}