import { queryOptions } from "@tanstack/react-query"

export default (id: string) => {
    return queryOptions({
        queryKey: ["album", id],
        queryFn: async () => {
            const res = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (!res.ok) {
                throw new Error("Fetching album error");
            }
            return res.json();
        },
    })
}