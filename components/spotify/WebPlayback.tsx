"use client"
import React, { useState, useEffect } from 'react';
import { SpotifySDK } from '@/types/spotifySDK';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { AudioLines, Bolt, Pause, Play, Repeat, Shuffle, SkipBackIcon, SkipForwardIcon } from 'lucide-react';
import PlayerProgressBar from './PlayerProgessBar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import VolumeSlider from './VolumeSlider';
import { useActions } from '@/actions';


function WebPlayback({ token }) {
    const { transferPlayback } = useActions();

    const [is_paused, setPaused] = useState(false);
    const [isActive, setActive] = useState(false);
    const [player, setPlayer] = useState<SpotifySDK.Player | undefined>(undefined);
    const [state, setState] = useState<Spotify.PlaybackState | null>(null);
    const [current_track, setTrack] = useState<Spotify.PlaybackState['track_window']['current_track'] | null>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);

    useEffect(() => {

        // const script = document.createElement("script");
        // script.src = "https://sdk.scdn.co/spotify-player.js";
        // script.async = true;
        // document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Music app',
                getOAuthToken: (cb) => { cb(token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setDeviceId(device_id);
                player.getCurrentState().then(state => {
                    console.log('Current state', state);
                    state ? setActive(true) : setActive(false);
                });
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('authentication_error', () => {
                console.log('Authentication Error');
            });

            player.addListener('player_state_changed', (state => {

                if (!state) {
                    return setActive(false);
                }

                setActive(true);
                setPlayer(player);

                console.log('State changed', state);

                setState(state);
                setTrack(state.track_window.current_track);
                setPaused(state.paused);

            }));

            player.connect()

        };
    }, []);

    if (!isActive || !player) {
        return (
            <div className='flex items-center justify-center h-full'>

                <Button onClick={() => deviceId && transferPlayback(deviceId, true)}>
                    <AudioLines />Transfer playback
                </Button>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-[1fr,1fr,auto] lg:grid-cols-[250px,1fr,auto] xl:grid-cols-[300px,1fr,auto] grid-rows-[1fr,auto] gap-2 p-4'>

            {/* Thumbnail / Title */}
            <div className='row-span-1 col-span-2 lg:row-span-2 lg:col-span-1 flex items-center gap-4'>
                {current_track ?
                    <img src={current_track.album.images[0].url} className="size-16" alt="" />
                    :
                    <div className='size-16 bg-secondary'></div>
                }
                <div className='w-[200px] lg:w-[180px] xl:w-[230px]'>
                    <a className="block text-sm font-semibold truncate">{current_track?.name ?? '-'}</a>
                    <a className="block text-sm text-muted-foreground">{current_track?.artists[0].name ?? '-'}</a>
                </div>
            </div>


            {/* Playback controls */}
            <div className='flex items-center gap-4 justify-center'>
                <Button variant="ghost" size="icon" onClick={() => { player.previousTrack() }}>
                    <Shuffle />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => { player.previousTrack() }}>
                    <SkipBackIcon />
                </Button>
                <Button variant="default" size="icon" onClick={() => { player.togglePlay() }}>
                    {is_paused ? <Play /> : <Pause />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => { player.nextTrack() }}>
                    <SkipForwardIcon />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => { player.previousTrack() }}>
                    <Repeat />
                </Button>
            </div>

            {/* Progression */}
            <div className='col-start-1 col-span-3 lg:col-start-2 lg:row-start-2 lg:col-span-1'>
                {state &&
                    <PlayerProgressBar
                        duration={state.duration}
                        position={state.position}
                        stopped={state.paused}
                        onSeek={(value) => player.seek(value)}
                    />
                }
            </div>

            {/* <div className='flex flex-col items-center flex-grow gap-2'>
            </div> */}

            {/* Other controls */}
            <div className='lg:row-span-2 lg:col-start-3 lg:row-start-1 hidden lg:block lg:w-[150px] xl:w-[200px]'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Bolt />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p >Playback quality</p>
                            <p className='text-center font-semibold'>{state?.playback_quality}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <VolumeSlider />
            </div>
        </div>
    );

}

export default WebPlayback
