import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useHistoryState } from "@/hooks/useNavigationHistory";
import { useRouter } from "next/navigation";

export default function HistoryNav() {
    const router = useRouter();
    const navHist = useHistoryState();
    return (
        <div className="flex items-center">
            <Button
                size="icon"
                variant="ghost"
                onClick={() => router.back()}
                disabled={!navHist.previousRoute}
            >
                <ArrowLeft />
            </Button>
            <Button
                size="icon"
                variant="ghost"
                onClick={() => router.forward()}
                disabled={!navHist.nextRoute}
            >
                <ArrowRight />
            </Button>
        </div>
    )
}