import { Volume1, Volume2, VolumeOff } from "lucide-react";
import { Slider } from "../ui/slider";
import { useEffect, useState } from "react";
import { usePlayer } from "@/app/contexts/SpotifyPlayer";

export default function VolumeSlider() {
    const [values, setValues] = useState([50]);
    const { player } = usePlayer();
    useEffect(() => {
        player?.setVolume(values[0] / 100);
    }, [values, player]);
    return (
        <div className="flex items-center gap-2">
            { values[0] > 50 && <Volume2 /> }
            { values[0] <= 50 && values[0] !== 0 && <Volume1 /> }
            { values[0] === 0 && <VolumeOff /> }
            <Slider
                value={values}
                onValueChange={setValues}
            />
        </div>
    );
}