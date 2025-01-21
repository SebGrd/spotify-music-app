import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { Slider } from "../ui/slider";

type PlayerProgressBarProps = {
    duration: number;
    position: number;
    stopped: boolean;
    onSeek: (position: number) => void;
}

export default function PlayerProgressBar({ duration, position, stopped, onSeek }: PlayerProgressBarProps) {
    const [progress, setProgress] = useState((position / duration) * 100);
    const [runningPosition, setRunningPosition] = useState(0);

    const [sliderValue, setSliderValue] = useState([(position / duration) * 100]);
    const [isSliding, setIsSliding] = useState(false);

    useEffect(() => {
        if (stopped) {
            return setRunningPosition(position);
        }
        const interval = setInterval(() => {
            setRunningPosition((prev) => prev + 200);
        }, 200);
        setRunningPosition(position);
        return () => clearInterval(interval);
    }, [position, duration, stopped]);

    useEffect(() => {
        setProgress((runningPosition / duration) * 100);
        if (!isSliding) {
            setSliderValue([progress]);
        }
    }, [runningPosition]);

    useEffect(() => {
        setSliderValue([progress]);
    }, [])



    const handleSeek = (position: number) => {
        console.log('Value to', position);
        console.log('Seeking to', Math.floor((position / 100) * duration));
        onSeek(Math.floor((position / 100) * duration));
    }

    return (
        <div className="flex items-center w-full gap-3">
            <span className="text-muted-foreground text-sm w-[50px] text-right">
                {Math.floor(runningPosition / 1000 / 60)}:{Math.floor(runningPosition / 1000 % 60).toString().padStart(2, '0')}
            </span>
            <div className="relative flex-grow group/bar h-4">
                <Progress value={progress} className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none" />
                <Slider
                    step={0.1}
                    value={sliderValue}
                    onValueChange={(values) => {
                        setSliderValue(values);
                        setIsSliding(true);
                    }}
                    onValueCommit={(values) => {
                        handleSeek(values[0]);
                        setIsSliding(false);
                    }}

                    className="absolute top-1/2 -translate-y-1/2 left-0 opacity-0 transition group-hover/bar:opacity-100 cursor-pointer"
                />
            </div>
            <span className="text-muted-foreground text-sm w-[50px]">
                {Math.floor(duration / 1000 / 60)}:{Math.floor(duration / 1000 % 60).toString().padStart(2, '0')}
            </span>
        </div>

    )
}