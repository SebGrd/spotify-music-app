import PageLink from "../navigation/PageLink";


export default function TrackArtists({ artists, className }: { artists: SpotifyApi.ArtistObjectSimplified[], className?: string }) {
    return (
        <p className={className}>
            {artists.map((artist, index) => (
                <span key={`artist-${index}`}>
                    <PageLink
                        type="artist"
                        id={artist.id}
                        className="hover:underline">
                        {artist.name}
                    </PageLink>{index < artists.length - 1 ? ", " : ""}
                </span>
            ))}
        </p>

    )

}