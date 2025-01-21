import AlbumList from "@/components/albums/AlbumList";

export default function PlaylistsPage() {
    return (
        <div className="">
            <div className="p-4">
                <h1 className="text-3xl font-bold py-8 px-2">Albums (12)</h1>
                <AlbumList />
            </div>

        </div>
    );
}