import { ArtistsPagination } from "@/types/global";
import { SpotifyApi } from "@/types/spotifyApi"

export type MyArtistsQueryKeys = ["myArtists", ArtistsPagination];

export const myArtistsQuery = (pagination: ArtistsPagination) =>  ({
    queryKey: ["myArtists", pagination],
    queryFn: async (): Promise<SpotifyApi.UsersFollowedArtistsResponse> => {
        const searchParams = new URLSearchParams({
            type: "artist",
            after: pagination.after ?? "",
            limit: pagination.limit?.toString() ?? "50",
        }).toString();
        const res = await fetch(`https://api.spotify.com/v1/me/following?${searchParams}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) {
            throw new Error("Fetching artists error");
        }
        return res.json();
    }
});