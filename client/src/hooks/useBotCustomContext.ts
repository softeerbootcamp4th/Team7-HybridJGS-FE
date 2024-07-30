import { useContext } from "react";
import { BotCustomContext, BotCustomContextType } from "../contexts/botCustomContext";

export default function useBotCustomContext(): BotCustomContextType {
    const context = useContext(BotCustomContext);
    if (context === null) {
        throw new Error("botCustomContext must be used within a BotCustomProvider");
    }
    return context;
}
