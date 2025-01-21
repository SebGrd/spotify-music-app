// gather all actions in one place and provide them as a hook
import { transferPlayback } from "./transferPlayback";

export function useActions() {
    return { transferPlayback };
}