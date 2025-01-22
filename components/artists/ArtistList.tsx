"use client"

import { useStore } from "@/store/store-hook"
import { Skeleton } from "../ui/skeleton";
import Cover from "../spotify/Cover";
import ArtistItem from "./ArtistItem";

export default function ArtistList() {
    const { myArtists } = useStore();
    const artists = myArtists({ limit: 50 });

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {artists.isSuccess ? <>
                    {
                        artists.data.artists.items.map((artist) => (
                            <ArtistItem artist={artist} key={artist.id} />
                        ))
                    }
                </>
                    : <>
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div className="flex gap-4 rounded-md" key={`skeleton-${i}`}>
                                <div className="size-32 flex-shrink-0">
                                    <Cover type="artist" isLoading />
                                </div>
                                <div className="py-3 flex-grow self-center">
                                    <Skeleton className="w-2/3 h-4 mb-3" />
                                    <Skeleton className="w-2/3 h-4 mb-3" />
                                    <Skeleton className="w-1/3 h-4 mb-3" />
                                </div>
                            </div>
                        ))}
                    </>
                }
            </div>
        </div>
    )
}