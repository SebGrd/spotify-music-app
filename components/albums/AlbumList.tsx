"use client"

import { useStore } from "@/store/store-hook"
import { FileMusicIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import Cover from "../spotify/Cover";
import PlayableCard from "../cards/PlayableCard";

export default function AlbumList() {
    const { myAlbums, playerMutation } = useStore();
    const albums = myAlbums({ limit: 30, offset: 0 });
    const router = useRouter();

    const handleCardCLick = (playlist: SpotifyApi.AlbumObjectFull) => {
        router.push(`/webplayer/albums/${playlist.id}`);
    }

    const handlePlaylistPlay = (playlist: SpotifyApi.AlbumObjectFull) => {
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
                {albums.isSuccess ? <>
                    {
                        albums.data.items.map(({ album }) => (
                            <PlayableCard
                                key={`playlist-${album.id}`}
                                type="album"
                                imgUrl={album.images?.[1].url}
                                name={album.name}
                                onCardClick={() => handleCardCLick(album)}
                                onPlayClick={() => handlePlaylistPlay(album)}
                            >
                                <div className="flex items-center gap-2 h-5 mb-2">
                                    <p className="text-muted-foreground text-sm font-semibold truncate">
                                        {album.artists.map((artist, i) => (
                                            <span key={artist.id}>{artist.name}{i < album.artists.length - 1 && ', '}</span>
                                        ))}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 h-5">
                                    <span className="text-muted-foreground text-sm">{new Date(album.release_date).getFullYear()}</span>
                                    <Separator orientation="vertical" />
                                    <div className="flex items-center gap-1">
                                        <FileMusicIcon size={16} className="text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{album.tracks.total}</span>
                                    </div>
                                </div>
                            </PlayableCard>
                        ))
                    }
                </>
                    : <>
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div className="relative p-2 rounded-md" key={`skeleton-${i}`}>
                                <Cover type="album" isLoading />
                                <div className="py-3">
                                    <Skeleton className="w-2/3 h-4 mb-3" />
                                    <Skeleton className="w-1/3 h-4 mb-3" />
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