import { useOptimistic, useState, startTransition } from "react";
import LikeButton from "./LikeButton";
import { followUnfollowArtist } from "@/actions/followUnfollowArtitst";
import { useStore } from "@/store/store-hook";

type FollowButtonProps = {
    artistId: string;
}


export default function FollowButton({ artistId }: FollowButtonProps) {
    const { isFollowing } = useStore();
    const { data: isUserFollowing, refetch } = isFollowing(artistId);
    const [optimisticState, setOptimisticState] = useOptimistic(isUserFollowing ?? [false]);
    const [isSaving, setIsSaving] = useState(false);

    const handleToggleFollow = async () => {
        setIsSaving(true);
        startTransition(async () => {
            setOptimisticState((prev) => [!prev[0]]);
            try {
                await followUnfollowArtist(artistId, optimisticState[0] ? 'unfollow' : 'follow');
                await refetch();
            } catch {
                setOptimisticState((prev) => prev);
            } finally {
                setIsSaving(false);
            }
        })

    }

    return (
        <LikeButton
            text="Follow"
            activeText="Unfollow"
            isActive={optimisticState[0]}
            disabled={isSaving}
            onClick={handleToggleFollow} />
    )
}