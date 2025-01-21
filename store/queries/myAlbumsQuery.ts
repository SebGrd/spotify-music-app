import { Pagination } from "@/types/global";
import { SpotifyApi } from "@/types/spotifyApi"

export type MyAlbumsQueryKeys = ["myAlbums", Pagination];

export const myAlbumsQuery = (pagination: Pagination) =>  ({
    queryKey: ["myAlbums", pagination],
    queryFn: async (): Promise<SpotifyApi.UsersSavedAlbumsResponse> => {
        const searchParams = new URLSearchParams({
            offset: pagination.offset.toString(),
            limit: pagination.limit.toString(),
        }).toString();
        const res = await fetch(`https://api.spotify.com/v1/me/albums?${searchParams}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) {
            throw new Error("Fetching albums error");
        }
        return res.json();
    }
});