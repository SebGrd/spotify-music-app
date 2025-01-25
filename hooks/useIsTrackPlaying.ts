import { usePlayer } from "@/app/contexts/SpotifyPlayer";
import { useEffect, useState } from "react";

type useIsPlayingParams = {
    contextUri?: string;
    trackId: string;
}

/**
 * @summary This hook checks if a track is playing. Optionally you can pass the context uri of the track
 * @param contextUri : string? - The context uri of the track (Albums, Playlists, Artists uris) 
 * @param trackId  : string - The track id
 * @returns boolean - Returns true if the track is playing
 */
export default function useIsTrackPlaying({ contextUri, trackId }: useIsPlayingParams) {
    const { state, currentTrack } = usePlayer();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (contextUri) {
            if (state?.context.uri === contextUri) {
                if (currentTrack?.id === trackId) {
                    setIsPlaying(true);
                } else {
                    setIsPlaying(false);
                }
            } else {
                setIsPlaying(false);
            }
        } else {
            if (currentTrack?.id === trackId) {
                setIsPlaying(true);
            } else {
                setIsPlaying(false);
            }
        }
    }, [state, currentTrack, contextUri, trackId]);
    return isPlaying;
}