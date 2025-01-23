import Image from "next/image";
import Cover from "../spotify/Cover";
import PlayButton from "../spotify/PlayButton";
import FollowButton from "../stateCta/FollowButton";

export default function ArtistHeader({ artist }: { artist: SpotifyApi.SingleArtistResponse }) {
    return (
        <section className="relative z-0 py-8 px-4">
            <div className="absolute inset-0 -z-10 overflow-hidden opacity-30">
                <Image
                    src={artist.images[0].url}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover blur-xl"
                />
            </div>
            <div className="flex gap-8">
                <div className="size-64">
                    <Cover type="artist" imgUrl={artist.images[0].url} />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-7xl font-bold">{artist.name}</h1>
                    <p>{artist.followers.total.toLocaleString()} followers</p>
                    <p className="capitalize text-muted-foreground">{artist.genres.join(', ')}</p>
                    <div className="flex-grow content-end">
                        <div className="flex gap-2">
                            <PlayButton context_uri={artist.uri} text="Play" />
                            <FollowButton artistId={artist.id} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}