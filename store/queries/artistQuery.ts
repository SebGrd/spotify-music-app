import { queryOptions } from "@tanstack/react-query"

export const artistQuery = (id: string) => {
    return queryOptions({
        queryKey: ["artist", id],
        queryFn: async () => {
            const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (!res.ok) {
                throw new Error("Fetching artist error");
            }
            return res.json();
        },
    })
}