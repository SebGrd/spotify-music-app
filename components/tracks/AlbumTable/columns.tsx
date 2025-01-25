"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Heart, ListPlus, MicVocal, MoreHorizontal, PlusSquare, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import TrackArtists from "../TrackArtists"
import TrackListPlayButton from "@/components/spotify/TrackListPlayButton"


export const columns: ColumnDef<SpotifyApi.TrackObjectSimplified>[] = [
    {
        id: "index",
        header: "#",
        maxSize: 10,
        cell: ({ row, table }) => {
            return (
                <div className="relative">
                    <span className="text-muted-foreground inline group-hover/row:hidden">{row.index + 1}</span>
                    {table.options.meta &&
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <TrackListPlayButton
                                contextUri={table.options.meta.albumContextUri}
                                trackId={row.original.id}
                                offset={{
                                    position: row.original.track_number - 1
                                }}
                            />
                        </div>
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "name",
        header: "Title",
        cell: ({ row }) => {
            const track = row.original;
            if (!track) return null;
            return (
                <div>
                    <p className="truncate font-medium">
                        {track.name}
                    </p>
                    <TrackArtists artists={track.artists} className="text-muted-foreground text-sm" />
                </div>
            )
        }
    },
    {
        accessorKey: "duration_ms",
        header: "Length",
        size: 120,
        cell: ({ row }) => {
            const duration = row.original.duration_ms;
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
        size: 60,
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><MicVocal />See artist</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Share />Share</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
