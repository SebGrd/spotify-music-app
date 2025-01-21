"use client"

import { useStore } from "@/store/store-hook"
import { FileMusicIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import Cover from "../spotify/Cover";
import PlayableCard from "../cards/PlayableCard";

export default function PlaylistList() {
    const { myPlaylists, playerMutation } = useStore();
    const playlists = myPlaylists({ limit: 30, offset: 0 });
    const router = useRouter();

    const handleCardCLick = (playlist: SpotifyApi.PlaylistBaseObject) => {
        router.push(`/webplayer/playlists/${playlist.id}`);
    }

    const handlePlaylistPlay = (playlist: SpotifyApi.PlaylistObjectSimplified) => {
        playerMutation.mutate({
            action: 'play',
            id: 'd609e6df49205b3d99bca506f60c30e7cb9d70a6',
            body: {
                context_uri: playlist.uri
            }
        });
    }
    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-4">
                {playlists.isSuccess ? <>
                    {
                        playlists.data.items.map((playlist) => (
                            <PlayableCard
                                key={`playlist-${playlist.id}`}
                                type="playlist"
                                imgUrl={playlist.images?.[0].url}
                                name={playlist.name}
                                onCardClick={() => handleCardCLick(playlist)}
                                onPlayClick={() => handlePlaylistPlay(playlist)}
                            >
                                <div className="flex items-center gap-2 h-5">
                                    <div className="flex items-center gap-1">
                                        <FileMusicIcon size={16} className="text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{playlist.tracks.total}</span>
                                    </div>
                                    {playlist.description &&
                                        <>
                                            <Separator orientation="vertical" />
                                            <p className="text-muted-foreground text-sm truncate">{playlist.description}</p>
                                        </>
                                    }
                                </div>
                            </PlayableCard>
                        ))
                    }
                </>
                    : <>
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div className="relative p-2 rounded-md" key={`skeleton-${i}`}>
                                <Cover type="playlist" isLoading />
                                <div className="py-3">
                                    <Skeleton className="w-2/3 h-4 mb-3" />
                                    <Skeleton className="w-1/3 h-3" />
                                </div>
                            </div>
                        ))}
                    </>
                }
            </div>
        </div>
    )
}