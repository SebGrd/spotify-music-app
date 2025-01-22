import { Button } from "../ui/button";
import { Play } from "lucide-react";
import { usePlayer } from "@/app/contexts/SpotifyPlayer";

type PlayButtonProps = {
    text?: string;
    context_uri: string;
}

export default function PlayButton({ context_uri, text }: PlayButtonProps) {
    const { play } = usePlayer();


    const handlePlaylistPlay = () => {
        play({ context_uri });
    }

    return (
        <Button
            size={text ? "default" : "icon"}
            onClick={(e) => {
                e.stopPropagation();
                handlePlaylistPlay()
            }}
        >
              <Play /> {text}
        </Button>
    )
}