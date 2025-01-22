import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    if (!clientId || !body.refresh_token) {
        return NextResponse.error();
    }
    const payload = {
        grant_type: 'refresh_token',
        refresh_token: body.refresh_token,
        client_id: clientId,
    };
    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${clientId}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
        },
        body: new URLSearchParams(payload),
    })
    const data = await res.json();
    return NextResponse.json(data);
}