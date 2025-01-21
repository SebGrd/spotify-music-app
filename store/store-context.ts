import { Pagination } from "@/types/global";
import { SpotifyApi } from "@/types/spotifyApi";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { createContext } from "react";
import { MutationData, PlayerMutationAction } from "./mutations/playerMutation";


type StoreContextType = {
    user: UseQueryResult<SpotifyApi.UserProfileResponse>;
    myPlaylists: (pagination: Pagination) => UseQueryResult<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>;
    playlist: (id: string) => UseQueryResult<SpotifyApi.PlaylistObjectFull>;
    myAlbums: (pagination: Pagination) => UseQueryResult<SpotifyApi.UsersSavedAlbumsResponse>;
    album: (id: string) => UseQueryResult<SpotifyApi.AlbumObjectFull>;
    playerMutation: UseMutationResult<any, unknown, MutationData<PlayerMutationAction>, unknown>;
};

export const StoreContext = createContext<StoreContextType | null>(null);