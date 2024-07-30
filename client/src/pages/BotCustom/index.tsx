import { BotCustomProvider } from "@/contexts/botCustomContext";
import Panels from "@/features/BotCustom/Panels";

export default function BotCustom() {
    return (
        <BotCustomProvider>
            <Panels />
        </BotCustomProvider>
    );
}
