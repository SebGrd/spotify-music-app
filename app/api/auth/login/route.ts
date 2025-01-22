import { NextResponse } from "next/server";
import { randomUUID } from 'crypto';



export async function GET() {
   const scope = "streaming user-read-email user-read-private user-library-read user-modify-playback-state user-follow-read user-follow-modify"
   const state = randomUUID().replaceAll('-', '').slice(0, 16)
   const clientId = process.env.SPOTIFY_CLIENT_ID;
   const redirtectUri = process.env.SPOTIFY_REDIRECT_URI;
   if (!clientId || !redirtectUri) {
      return NextResponse.error();
   }
   const authQueryParams = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: scope,
      redirect_uri: redirtectUri,
      state: state
    })
   return NextResponse.redirect(`https://accounts.spotify.com/authorize?${authQueryParams.toString()}`)
}