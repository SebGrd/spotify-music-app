
"use client"
import Cover from "@/components/spotify/Cover";
import PlayButton from "@/components/spotify/PlayButton";
import AlbumTable from "@/components/tracks/AlbumTable";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/store/store-hook";
import { use } from "react";

export default function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
    const id = use(params).id;
    const { album: albumQuery } = useStore();
    const album = albumQuery(id);

    return (
        <div>
            {album.isSuccess ?
                <>
                    <section className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 px-4 py-12">
                        <div className="w-48 justify-self-center">
                            <Cover type="album" imgUrl={album.data.images?.[0].url} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-xl lg:text-3xl font-bold">{album.data.name}</h1>
                            <p className="text-muted-foreground text-sm font-semibold truncate">
                                {album.data.artists.map((artist, i) => (
                                    <span key={artist.id}>{artist.name}{i < album.data.artists.length - 1 && ', '}</span>
                                ))}
                            </p>
                            <div className="flex items-center gap-3 h-4">
                                <p className="text-sm capitalize">{album.data.album_type}</p>
                                <Separator orientation="vertical" />
                                <p className="text-sm">{album.data.tracks.total} tracks</p>
                            </div>
                            <div className="flex-grow content-end">
                                <PlayButton context_uri={album.data.uri} text="Play" />
                            </div>
                        </div>
                    </section>
                </>
                :
                <>
                    <section className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 px-4 py-12">
                        <div className="w-48 justify-self-center">
                            <Cover type="album" isLoading />
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
                            </div>
                            <div className="flex-grow content-end">
                                <Skeleton className="w-20 h-10" />
                            </div>
                        </div>
                    </section>
                </>

            }


            <section className="px-4">
                <AlbumTable tracks={album.data?.tracks?.items ?? []} isLoading={!album.isSuccess} />
            </section>

        </div>
    )
}