import { useMemo } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Skeleton } from "@/components/ui/skeleton";

type AlbumTableData = {
    tracks: SpotifyApi.TrackObjectSimplified[];
    albumContextUri: string;
}

export default function AlbumTable({ data, isLoading }: { data: AlbumTableData, isLoading?: boolean }) {
    const tableData = useMemo(() => (isLoading ? Array(30).fill({}) : data.tracks), [data, isLoading]);
    const tableColumns = useMemo(() => (isLoading
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton className="w-full h-10" />,
        }))
        : columns),
        [isLoading]);
    return (
        <DataTable columns={tableColumns} data={tableData} meta={
            { albumContextUri: data.albumContextUri }
        } />
    )
}