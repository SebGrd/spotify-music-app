import ArtistList from "@/components/artists/ArtistList";

export default function PlaylistsPage() {
    return (
        <div className="">
            <div className="p-4">
                <h1 className="text-3xl font-bold py-8 px-2">Artists (5)</h1>
                <ArtistList />
            </div>

        </div>
    );
}