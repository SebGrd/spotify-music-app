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
import PageLink from "@/components/navigation/PageLink"
import TrackArtists from "../TrackArtists"
import TrackListPlayButton from "@/components/spotify/TrackListPlayButton"


export const columns: ColumnDef<SpotifyApi.PlaylistTrackObject>[] = [
    {
        id: "index",
        header: "#",
        maxSize: 10,
        cell: ({ row, table }) => {
            return (
                <div className="relative">
                    <span className="text-muted-foreground inline group-hover/row:hidden">{row.index + 1}</span>
                    {table.options.meta && row.original.track &&
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <TrackListPlayButton
                                contextUri={table.options.meta.albumContextUri}
                                trackId={row.original.track.id}
                                offset={{
                                    position: row.index,
                                }}
                            />
                        </div>
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "track.name",
        header: "Title",
        cell: ({ row }) => {
            const track = row.original.track;
            if (!track) return null;
            return (
                <div className="flex items-center gap-4">
                    <div className="size-10">
                        <Cover type="album" imgUrl={track.album.images?.[0]?.url ?? ""} />
                    </div>
                    <div>
                        {!track.is_local ?
                            <PageLink type="album" id={track.album.id} className="hover:underline font-medium">

                                {track.name}
                            </PageLink>
                            :
                            <p className="font-medium">{track.name}</p>
                        }
                        {!track.is_local && <TrackArtists artists={track.artists} className="text-muted-foreground text-sm" />}

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
            if (!album) return null;
            return (
                <PageLink type="album" id={album.id} className="hover:underline text-muted-foreground text-sm">
                    {album.name}
                </PageLink>
            )
        }
    },
    {
        accessorKey: "track.duration_ms",
        header: "Length",
        size: 120,
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
