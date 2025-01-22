import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SpotifySDK } from "@/types/spotifySDK";

type SpotifyPlayerContextType = {
    player: SpotifySDK.Player | null;
    deviceId: string | null;
    state: Spotify.PlaybackState | null;
    currentTrack: Spotify.PlaybackState['track_window']['current_track'] | null;
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
        }}>
            {children}
        </SpotifyPlayerContext.Provider>
    );
}