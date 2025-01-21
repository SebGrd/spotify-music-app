import { useStore } from "@/store/store-hook";
import { Button } from "../ui/button";
import { Play } from "lucide-react";

type PlayButtonProps = {
    text?: string;
    context_uri: string;
}

export default function PlayButton({ context_uri, text }: PlayButtonProps) {
    const { playerMutation } = useStore();


    const handlePlaylistPlay = () => {
        playerMutation.mutate({
            action: 'play',
            id: 'd609e6df49205b3d99bca506f60c30e7cb9d70a6',
            body: {
                context_uri
            }
        });
    }

    return (
        <Button
            size={text ? "default" : "icon"}
            className=""
            onClick={(e) => {
                e.stopPropagation();
                handlePlaylistPlay()
            }}
        >
              <Play /> {text}
        </Button>
    )
}