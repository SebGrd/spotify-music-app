"use client"

import Cover from "@/components/spotify/Cover"
import { ColumnDef } from "@tanstack/react-table"
import { Disc3, Heart, ListPlus, MicVocal, MoreHorizontal, PlusSquare, Share, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const columns: ColumnDef<SpotifyApi.PlaylistTrackObject>[] = [
    {
        accessorKey: "track.name",
        header: "Title",
        cell: ({ row }) => {
            const track = row.original.track;
            return (
                <div className="flex items-center gap-4">
                    <div className="size-10">
                        <Cover type="album" imgUrl={track?.album.images?.[0]?.url ?? ""} />
                    </div>
                    <div>
                        <p>
                            {track?.name}
                        </p>
                        <p className="text-muted-foreground text-sm">
                            {track?.artists.map((artist) => artist.name).join(", ")}
                        </p>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "track.album.name",
        header: "Album",
        cell: ({ row }) => {
            const album = row.original.track?.album;
            return (
                <p className="text-muted-foreground text-sm">
                    {album?.name}
                </p>
            )
        }
    },
    {
        accessorKey: "track.duration_ms",
        header: "Length",
        cell: ({ row }) => {
            const duration = row.original.track?.duration_ms;
            if (!duration) return null;
            const minutes = Math.floor(duration / 60000);
            const seconds = ((duration % 60000) / 1000).toFixed(0);
            return (
                <p className="text-muted-foreground text-sm">
                    {minutes}:{Number(seconds) < 10 ? '0' : ''}{seconds}
                </p>
            )
        }
    },
    {
        id: "actions",
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                        <DropdownMenuItem><ListPlus />Add to queue</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Heart />Favorite</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><PlusSquare /> Add to a playlist</DropdownMenuItem>
                        <DropdownMenuItem><Trash />Remove from this playlist</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><MicVocal />See artist</DropdownMenuItem>
                        <DropdownMenuItem><Disc3 />See album</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Share />Share</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
