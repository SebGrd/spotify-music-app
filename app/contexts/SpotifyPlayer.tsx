import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SpotifySDK } from "@/types/spotifySDK";
import { SpotifyApi } from "@/types/spotifyApi";

type SpotifyPlayerContextType = {
    player: SpotifySDK.Player | null;
    deviceId: string | null;
    state: Spotify.PlaybackState | null;
    currentTrack: Spotify.PlaybackState['track_window']['current_track'] | null;
    play (data: Omit<SpotifyApi.PlayParameterObject, 'device_id'>): void;
};

async function PlayerPlay(data: SpotifyApi.PlayParameterObject) {
    try {
        const res = await fetch("https://api.spotify.com/v1/me/player/play", {
            method: "PUT",
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            throw new Error("Error trying to play this context");
        }
    } catch {
        throw new Error("Error trying to play this context");
    }
};

const SpotifyPlayerContext = createContext<SpotifyPlayerContextType | null>(null);

export const usePlayer = () => {
    const context = useContext(SpotifyPlayerContext);
    if (!context) {
        throw new Error("usePlayer must be used within a SpotifyPlayerProvider");
    }
    return context;
};

export function SpotifyPlayerProvider({ children }: { children: React.ReactNode }) {

    const [player, setPlayer] = useState<SpotifySDK.Player | null>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [state, setState] = useState<Spotify.PlaybackState | null>(null);
    const currentTrack = useMemo(() => {
        if (!state) {
            return null;
        }
        return state.track_window.current_track;
    }, [state]);

    const play = (data: Omit<SpotifyApi.PlayParameterObject, 'device_id'>) => {
        if (!deviceId) {
            return;
        }
        PlayerPlay({ ...data, device_id: deviceId });
    }

    const init = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
        window.onSpotifyWebPlaybackSDKReady = () => {
            const initializedPlayer = new window.Spotify.Player({
                name: 'Music app',
                getOAuthToken: (cb) => { cb(token) },
                volume: 0.3
            });
            initializedPlayer.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setDeviceId(device_id);
                initializedPlayer.getCurrentState().then((state) => {
                    setState(state);
                });
            });
            initializedPlayer.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
            initializedPlayer.addListener('authentication_error', (err) => {
                console.log('Auth error', err);
            });
            initializedPlayer.addListener('account_error', (err) => {
                console.log('Need a Premium Spotify Subscription', err);
            });
            initializedPlayer.addListener('playback_error', (err) => {
                console.log('Playback error', err);
            });
            initializedPlayer.addListener('player_state_changed', (state) => {
                console.log('State changed', state);
                setState(state);
            })
            initializedPlayer.connect();
            setPlayer(initializedPlayer);
        };
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <SpotifyPlayerContext.Provider value={{
            player,
            deviceId,
            state,
            currentTrack,
            play,
        }}>
            {children}
        </SpotifyPlayerContext.Provider>
    );
}