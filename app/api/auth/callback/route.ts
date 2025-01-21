import { NextResponse } from "next/server";

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const code = searchParams.get('code');
   const authString = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
   const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
   if (!code || !redirectUri) {
      return NextResponse.error();
   }
   const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': `Basic ${authString}`
      },
      body: new URLSearchParams({
         grant_type: 'authorization_code',
         code: code,
         redirect_uri: redirectUri,
      })
   })
   if (!res.ok) {
      return NextResponse.error();
   }
   const data = await res.json();
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   return NextResponse.redirect(`${baseUrl}/auth/token?token=${data.access_token}`);
}