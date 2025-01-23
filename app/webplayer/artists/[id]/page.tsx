
"use client"

import ArtistHeader from "@/components/artists/ArtistHeader";
import ArtistTopTitles from "@/components/artists/ArtistTopTitles";
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
            <ArtistTopTitles artistId={data.id} />
        </div>
    )
}