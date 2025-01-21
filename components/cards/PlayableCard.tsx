import { Play } from "lucide-react";
import { Button } from "../ui/button";
import Cover from "../spotify/Cover";

interface PlayableCardProps {
    type: "album" | "playlist";
    name: string;
    imgUrl: string;
    onCardClick: () => void;
    onPlayClick: () => void;
    children: React.ReactNode;
}

export default function PlayableCard({ type, name, imgUrl, onCardClick, onPlayClick, children }: PlayableCardProps) {
    return (
        <div
            className="group/card relative p-2 rounded-md cursor-pointer hover:bg-secondary transition-all duration-200"
            onClick={(e) => {
                e.stopPropagation();
                onCardClick();
            }}
        >
            <Button
                size="icon"
                className="absolute top-4 right-4 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200"
                onClick={(e) => {
                    e.stopPropagation();
                    onPlayClick();
                }}
            >
                <Play />
            </Button>
            <Cover type={type} imgUrl={imgUrl} />
            <div className="py-2">
                <p className="truncate mb-1 font-medium hover:underline">{name}</p>
                {children}
            </div>
        </div>
    )
}