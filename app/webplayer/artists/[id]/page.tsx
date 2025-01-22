
"use client"

import Cover from "@/components/spotify/Cover";
import PlayButton from "@/components/spotify/PlayButton";
import FollowButton from "@/components/stateCta/FollowButton";
import { useStore } from "@/store/store-hook";
import Image from "next/image";
import { use } from "react";

export default function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
    const id = use(params).id;
    const { artist } = useStore();
    const { data, isSuccess } = artist(id);

    if (!isSuccess) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            <section className="relative z-0 py-8 px-4">
                <div className="absolute inset-0 -z-10 overflow-hidden opacity-30">
                    <Image
                        src={data.images[0].url}
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover blur-xl"
                    />
                </div>
                <div className="flex gap-8">
                    <div className="size-64">
                        <Cover type="artist" imgUrl={data.images[0].url} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-7xl font-bold">{data.name}</h1>
                        <p>{data.followers.total.toLocaleString()} followers</p>
                        <p className="capitalize text-muted-foreground">{data.genres.join(', ')}</p>
                        <div className="flex-grow content-end">
                            <div className="flex gap-2">
                                <PlayButton context_uri={data.uri} text="Play" />
                                <FollowButton artistId={id}  />
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}