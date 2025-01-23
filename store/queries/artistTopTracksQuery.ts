import { queryOptions } from "@tanstack/react-query"

export const artistTopTracksQuery = (id: string) => {
    return queryOptions({
        queryKey: ["artistTopTracks", id],
        queryFn: async () => {
            const res = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (!res.ok) {
                throw new Error("Fetching artistTopTracks error");
            }
            return res.json();
        },
    })
}