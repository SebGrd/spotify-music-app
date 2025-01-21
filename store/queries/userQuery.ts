import { SpotifyApi } from "@/types/spotifyApi"

export const userQuery = {
    queryKey: ["user"],
    queryFn: async (): Promise<SpotifyApi.UserProfileResponse> => {
        const res = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) {
            throw new Error("Fetching user error");
        }
        return res.json();
    }
}