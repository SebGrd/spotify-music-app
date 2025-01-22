import { useMutation, useQuery } from "@tanstack/react-query";
import { userQuery } from "./queries/userQuery"
import { StoreContext } from "./store-context"
import { myPlaylistsQuery } from "./queries/myPlaylistsQuery";
import { playerMutation } from "./mutations/playerMutation";
import playlistQuery from "./queries/playlistQuery";
import { myAlbumsQuery } from "./queries/myAlbumsQuery";
import albumQuery from "./queries/albumQuery";
import { myArtistsQuery } from "./queries/myArtistsQuery";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <StoreContext.Provider value={{
            user: useQuery(userQuery),
            myPlaylists: (pagination) => useQuery(myPlaylistsQuery(pagination)),
            playlist: (id) => useQuery(playlistQuery(id)),
            myAlbums: (pagination) => useQuery(myAlbumsQuery(pagination)),
            album: (id) => useQuery(albumQuery(id)),
            myArtists: (pagination) => useQuery(myArtistsQuery(pagination)),
            playerMutation: useMutation(playerMutation)
        }}>
            {children}
        </StoreContext.Provider>
    )
};