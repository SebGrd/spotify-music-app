import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type LikeButtonProps = {
    text?: string;
    activeText?: string;
    isActive: boolean;
    disabled?: boolean;
    onClick: () => void;
};

export default function LikeButton({ text, isActive, activeText, disabled, onClick }: LikeButtonProps) {
    return (
        <Button disabled={disabled} onClick={onClick}>
            <Heart className={cn({
                "fill-secondary": isActive,
            })} />{activeText && isActive ? activeText : text}
        </Button>
    )
}