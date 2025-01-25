import { Button } from "../ui/button";
import { Pause, Play } from "lucide-react";
import { usePlayer } from "@/app/contexts/SpotifyPlayer";
import { cn } from "@/lib/utils";
import useIsTrackPlaying from "@/hooks/useIsTrackPlaying";

type TrackListPlayButton = {
    contextUri: string;
    trackId: string;
    offset: {
        position: number;
    }
}

export default function TrackListPlayButton({ contextUri, trackId, offset }: TrackListPlayButton) {
    const { play } = usePlayer();
    const isPlaying = useIsTrackPlaying({ contextUri, trackId });

    const handlePlaylistPlay = () => {
        play({
            context_uri: contextUri,
            offset
        });
    }

    return (
        <Button
            size={"icon"}
            variant="secondary"
            onClick={(e) => {
                e.stopPropagation();
                handlePlaylistPlay()
            }}
             className={cn(
                "hidden group-hover/row:inline-flex",
                {
                    "inline-flex": isPlaying
                }
             )}
        >
            {isPlaying ? <Pause /> : <Play />}
        </Button>
    )
}