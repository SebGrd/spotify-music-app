import { SpotifyApi } from "@/types/spotifyApi"
import { MutationOptions } from "@tanstack/react-query";

export type PlayerMutationAction = "play" | "pause";

interface PlayMutationData {
    action: "play";
    id: string;
    body: SpotifyApi.PlayParameterObject;
}

interface PauseMutationData {
    action: "pause";
    id: string;
}


export type MutationData<T extends PlayerMutationAction> = T extends "play"
    ? PlayMutationData
    : T extends "pause"
    ? PauseMutationData
    : never;


export const playerMutation = {
    mutationFn: async <T extends PlayerMutationAction>(data: MutationData<T>) => {
        try {
            switch (data.action) {
                case "play":
                    const res = await fetch("https://api.spotify.com/v1/me/player/play", {
                        method: "PUT",
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                        body: JSON.stringify(data.body)
                    });
                    if (!res.ok) {
                        throw new Error("Fetching user error");
                    }
                    return res.json();
                default:
                    throw new Error("Invalid action");
            }
        } catch (e) {
            throw new Error("Player mutation error");
        }
    }
};