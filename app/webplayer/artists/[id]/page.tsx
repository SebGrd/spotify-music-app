
"use client"

import ArtistHeader from "@/components/artists/ArtistHeader";
import ArtistTopTitles from "@/components/artists/ArtistTopTitles";
import Cover from "@/components/spotify/Cover";
import { useStore } from "@/store/store-hook";
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
            <ArtistHeader artist={data} />
            <section className="flex gap-24 p-4 md:p-8">
                <div className="flex-grow">
                    <h2 className="font-semibold mb-4">Top titles</h2>
                    <ArtistTopTitles artistId={data.id} />
                </div>
                <div className="hidden lg:block">
                    <h2 className="font-semibold mb-4">Latest album</h2>
                    {/* @todo - Implement newest album feature */}
                    <div className="size-48">
                        <Cover type="album" imgUrl={data.images[0].url} />
                        <h3 className="font-medium mt-2">Lowlife Princess: Noir</h3>
                        <p className="text-sm text-muted-foreground">2024</p>
                    </div>
                </div>
            </section>
        </div>
    )
}