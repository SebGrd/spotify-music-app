import { Pagination } from "@/types/global";
import { SpotifyApi } from "@/types/spotifyApi"

export type MyPlaylistsQueryKeys = ["myPlaylists", Pagination];

export const myPlaylistsQuery = (pagination: Pagination) =>  ({
    queryKey: ["myPlaylists", pagination],
    queryFn: async (): Promise<SpotifyApi.ListOfCurrentUsersPlaylistsResponse> => {
        const searchParams = new URLSearchParams({
            offset: pagination.offset.toString(),
            limit: pagination.limit.toString(),
        }).toString();
        const res = await fetch(`https://api.spotify.com/v1/me/playlists?${searchParams}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) {
            throw new Error("Fetching user error");
        }
        return res.json();
    }
});