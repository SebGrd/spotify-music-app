import { queryOptions } from "@tanstack/react-query"

export const isFollowingQuery = (id: string) => {
    return queryOptions({
        queryKey: ["isFollowing", id],
        queryFn: async () => {
            const queryParams = new URLSearchParams({ type: 'artist', ids: id }).toString();
            const res = await fetch(`https://api.spotify.com/v1/me/following/contains?${queryParams}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (!res.ok) {
                throw new Error("Fetching following error");
            }
            return res.json();
        },
    })
}