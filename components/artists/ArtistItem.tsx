import { Play } from "lucide-react";
import Cover from "../spotify/Cover";
import { Button } from "../ui/button";
import { usePlayer } from "@/app/contexts/SpotifyPlayer";
import { useRouter } from "next/navigation";

export default function ArtistItem({ artist }: { artist: SpotifyApi.ArtistObjectFull }) {
    const { play } = usePlayer();
    const router = useRouter();
    const handleCardClick = () => {
        router.push(`/webplayer/artists/${artist.id}`);
    }
    const handlePlay = () => {
        play({ context_uri: artist.uri });
    }
    return (
        <article
            className="group/card flex gap-4 p-2 hover:bg-accent rounded-xl cursor-pointer"
            onClick={() => handleCardClick()}
        >
            <div className="relative size-32 flex-shrink-0">
                <Cover type="artist" imgUrl={artist.images[0].url} />
                <Button
                    className="opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/card:opacity-100 transition-opacity"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        handlePlay();
                    }}
                >
                    <Play />
                </Button>
            </div>
            <div className="min-w-0 self-center">
                <p className="text-xl font-medium flex-grow-0 hover:underline">{artist.name}</p>
                <p className="text-muted-foreground text-sm">{artist.followers.total.toLocaleString()} followers</p>
                <p className="capitalize text-sm truncate">{artist.genres.join(', ')}</p>
            </div>
        </article>
    )
}