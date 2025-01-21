import { useMemo } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function AlbumTable({ tracks, isLoading }: { tracks: SpotifyApi.TrackObjectSimplified[]; isLoading?: boolean }) {
    const tableData = useMemo(() => (isLoading ? Array(30).fill({}) : tracks), [tracks, isLoading]);
    const tableColumns = useMemo(() => (isLoading
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton className="w-full h-10" />,
        }))
        : columns),
        [isLoading]);
    return (
        <DataTable columns={tableColumns} data={tableData} />
    )
}