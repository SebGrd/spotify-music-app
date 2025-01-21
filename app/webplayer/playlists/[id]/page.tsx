
"use client"
import Cover from "@/components/spotify/Cover";
import PlayButton from "@/components/spotify/PlayButton";
import TrackTable from "@/components/tracks/TrackList";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/store/store-hook";
import { use } from "react";

export default function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
    const id = use(params).id;
    const { playlist: playlistStore } = useStore();
    const playlist = playlistStore(id);

    return (
        <div>
            {playlist.isSuccess ?
                <>
                    <section className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 px-4 py-12">
                        <div className="w-48 justify-self-center">
                            <Cover type="playlist" imgUrl={playlist.data.images?.[0].url} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-xl lg:text-3xl font-bold">{playlist.data.name}</h1>
                            {playlist.data.description &&
                                <p className="text-sm lg:text-base text-muted-foreground">{playlist.data.description}</p>
                            }
                            <div className="flex items-center gap-3 h-4">
                                <p className="text-sm">{playlist.data.public ? "Public playlist" : "Private playlist"}</p>
                                <Separator orientation="vertical" />
                                <p className="text-sm">{playlist.data.tracks.total} tracks</p>
                                <Separator orientation="vertical" />
                                <p className="text-sm">{playlist.data.owner.display_name}</p>
                                {playlist.data.followers.total > 0 &&
                                    <>
                                        <Separator orientation="vertical" />
                                        <p className="text-sm">Followers {playlist.data.followers.total}</p>
                                    </>
                                }
                                {playlist.data.collaborative &&
                                    <>
                                        <Separator orientation="vertical" />
                                        <p className="text-sm">Collaborative</p>
                                    </>
                                }
                            </div>
                            <div className="flex-grow content-end">
                                <PlayButton context_uri={playlist.data.uri} text="Play" />
                            </div>
                        </div>
                    </section>
                </>
                :
                <>
                    <section className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 px-4 py-12">
                        <div className="w-48 justify-self-center">
                            <Cover type="playlist" isLoading />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Skeleton className="w-1/3 h-9" />
                            <Skeleton className="w-32 h-5" />
                            <div className="flex items-center gap-3 h-4">
                                <Skeleton className="w-16 h-5" />
                                <Separator orientation="vertical" />
                                <Skeleton className="w-16 h-5" />
                                <Separator orientation="vertical" />
                                <Skeleton className="w-16 h-5" />
                                <Separator orientation="vertical" />
                                <Skeleton className="w-16 h-5" />
                            </div>
                            <div className="flex-grow content-end">
                                <Skeleton className="w-20 h-10" />
                            </div>
                        </div>
                    </section>
                </>

            }


            <section className="px-4">
                <TrackTable tracks={playlist.data?.tracks?.items ?? []} isLoading={!playlist.isSuccess} />
            </section>

        </div>
    )
}