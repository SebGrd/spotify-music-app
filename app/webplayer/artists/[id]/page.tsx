
"use client"

import { use } from "react";

export default function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
    const id = use(params).id;

    return (
        <div>
            <h1>Artist {id}</h1>
        </div>
    )
}