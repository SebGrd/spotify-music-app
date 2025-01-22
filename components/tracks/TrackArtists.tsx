import PageLink from "../navigation/PageLink";


export default function TrackArtists({ artists, className }: { artists: SpotifyApi.ArtistObjectSimplified[], className?: string }) {
    return (
        <p className={className}>
            {artists.map((artist, index) => (
                <>
                    <PageLink
                        key={`artist-${index}`}
                        type="artist"
                        id={artist.id}
                        className="hover:underline">
                        {artist.name}
                    </PageLink>{index < artists.length - 1 ? ", " : ""}
                </>
            ))}
        </p>

    )

}