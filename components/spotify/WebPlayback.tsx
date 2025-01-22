"use client"

import { Button } from '../ui/button';
import { AudioLines, Bolt, Pause, Play, Repeat, Shuffle, SkipBackIcon, SkipForwardIcon } from 'lucide-react';
import PlayerProgressBar from './PlayerProgessBar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import VolumeSlider from './VolumeSlider';
import { useActions } from '@/actions';
import Image from 'next/image';
import { usePlayer } from '@/app/contexts/SpotifyPlayer';


function WebPlayback() {
    const { transferPlayback } = useActions();
    const { player, state, deviceId, currentTrack } = usePlayer();

    if (!state || !player) {
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
                {currentTrack ?
                    <Image src={currentTrack.album.images[0].url} className="size-16" alt="" width={300} height={300} />
                    :
                    <div className='size-16 bg-secondary'></div>
                }
                <div className='w-[200px] lg:w-[180px] xl:w-[230px]'>
                    <a className="block text-sm font-semibold truncate">{currentTrack?.name ?? '-'}</a>
                    <a className="block text-sm text-muted-foreground">{currentTrack?.artists[0].name ?? '-'}</a>
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
                    {state.paused ? <Play /> : <Pause />}
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
