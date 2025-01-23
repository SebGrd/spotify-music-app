import { SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "../ui/ThemeModeSwitcher";
import HistoryNav from "../navigation/HistoryNav";

export default function AppHeader() {
    return (
        <header className="flex justify-between py-1 px-2 bg-background border-b border-border">
            <div className="flex items-center">
                <SidebarTrigger />
                <HistoryNav />
            </div>
            <ModeToggle />
        </header>
    )
}