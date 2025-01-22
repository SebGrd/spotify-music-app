import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";

type CoverProps = {
    type: "playlist" | "album" | "artist";
    imgUrl?: string;
    isLoading?: boolean;
}

export default function Cover({ type, imgUrl, isLoading }: CoverProps) {
    if (type === "album") {
        if (isLoading) {
            return (
                <AspectRatio ratio={1} className="overflow-hidden rounded-md border">
                    <Skeleton className="w-full h-full" />
                </AspectRatio>
            )
        }
        return (
            <AspectRatio ratio={1} className="overflow-hidden rounded-md border">
                {imgUrl && <Image src={imgUrl} alt="" className="object-cover w-full" loading="lazy" width={300} height={300} />}
            </AspectRatio>
        )
    }
    if (type === "playlist") {
        if (isLoading) {
            return (
                <div className="relative w-full pt-2">
                    <div className="absolute bg-muted-foreground opacity-50 rounded h-[90%] w-[90%] left-1/2 -translate-x-1/2 top-1"></div>
                    <div className="absolute bg-muted-foreground opacity-25 rounded h-[80%] w-[80%] left-1/2 -translate-x-1/2 top-0"></div>
                    <AspectRatio ratio={1} className="bg-background rounded-md border overflow-hidden">
                        <Skeleton className="w-full h-full" />
                    </AspectRatio>
                </div>
            )
        }
        return (
            <div className="relative w-full pt-2">
                <div className="absolute bg-muted-foreground opacity-50 rounded h-[90%] w-[90%] left-1/2 -translate-x-1/2 top-1"></div>
                <div className="absolute bg-muted-foreground opacity-25 rounded h-[80%] w-[80%] left-1/2 -translate-x-1/2 top-0"></div>
                <AspectRatio ratio={1} className="overflow-hidden rounded-md border">
                    {imgUrl && <Image src={imgUrl} alt="" className="object-cover w-full" width={300} height={300} />}
                </AspectRatio>
            </div>
        )
    }
    if (type === "artist") {
        if (isLoading) {
            return (
                <AspectRatio ratio={1} className="overflow-hidden rounded-xl border">
                    <Skeleton className="w-full h-full" />
                </AspectRatio>
            )
        }
        return (
            <AspectRatio ratio={1} className="overflow-hidden rounded-xl border">
                {imgUrl && <Image src={imgUrl} alt="" className="object-cover w-full h-full" loading="lazy" width={300} height={300} />}
            </AspectRatio>
        )
    }
}