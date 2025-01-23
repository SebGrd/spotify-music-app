import { useStore } from "@/store/store-hook"
import Cover from "../spotify/Cover";
import { msToReadableDuration } from "@/lib/utils";
import { Heart, MoreHorizontal } from "lucide-react";
import PageLink from "../navigation/PageLink";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { useMemo } from "react";


function ArtistTopTitle({ track, index }: { track: SpotifyApi.TrackObjectFull, index: number }) {
    return (
        <div className="grid grid-cols-[30px,auto,1fr,auto,auto,auto,auto] md:grid-cols-[30px,auto,1fr,1fr,auto,auto,auto] gap-2 mb-2">
            <div className="self-center justify-self-center">
                <span className="text-muted-foreground text-sm">
                    {index + 1}
                </span>
            </div>
            <div className="self-center">
                <div className="size-10">
                    <Cover type="album" imgUrl={track.album.images?.[0]?.url ?? ""} />
                </div>
            </div>
            <div className="self-center px-4">
                <p className="font-medium">{track.name}</p>
            </div>
            <div className="self-center md:block hidden">
                <PageLink type="album" id={track.album.id} className="text-muted-foreground hover:underline">
                    {track.album.name}
                </PageLink>
            </div>
            <div className="self-center">
                <span className="text-muted-foreground text-sm">
                    {msToReadableDuration(track.duration_ms)}
                </span>
            </div>
            <div className="self-center px-4">
                <Heart size={20} />
            </div>
            <div className="self-center px-4">
                <MoreHorizontal />
            </div>
        </div>
    )
}

export default function ArtistTopTitles({ artistId }: { artistId: string }) {
    const { artistTopTracks } = useStore();
    const { data, isSuccess } = artistTopTracks(artistId);
    const splitOne = useMemo(() => {
        if (!data) return [];
        return data.tracks.slice(0, data.tracks.length / 2);
    }, [data]);
    const splitTwo = useMemo(() => {
        if (!data) return [];
        return data.tracks.slice(data.tracks.length / 2, data.tracks.length);
    }, [data]);

    if (!isSuccess) {
        return <h1>Loading...</h1>
    }
    return (
        <section>
            <Collapsible>
                {splitOne.map((track, index) => (
                    <ArtistTopTitle key={`top-track-first-${index}`} track={track} index={index} />
                ))}
                <CollapsibleContent>
                    {splitTwo.map((track, index) => (
                        <ArtistTopTitle key={`top-track-second-${index}`} track={track} index={index + splitOne.length} />
                    ))}
                </CollapsibleContent>
                <CollapsibleTrigger className="group/trigger text-muted-foreground py-4">
                    <span className="group-data-[state=closed]/trigger:hidden">Show more</span>
                    <span className="group-data-[state=open]/trigger:hidden">Show less</span>
                </CollapsibleTrigger>
            </Collapsible>

        </section>
    )
}