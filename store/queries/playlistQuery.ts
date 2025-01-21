import { queryOptions } from "@tanstack/react-query"

export default (id: string) => {
    return queryOptions({
        queryKey: ["playlist", id],
        queryFn: async () => {
            const res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (!res.ok) {
                throw new Error("Fetching playlist error");
            }
            return res.json();
        },
    })
}