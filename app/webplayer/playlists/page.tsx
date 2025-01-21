import PlaylistList from "@/components/playlists/PlaylistList";

export default function PlaylistsPage() {
    return (
        <div className="">
            <div className="p-4">
                <h1 className="text-3xl font-bold py-8 px-2">Playlists (203)</h1>
                <PlaylistList />
            </div>

        </div>
    );
}