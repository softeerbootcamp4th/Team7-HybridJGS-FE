import { useContext } from "react";
import { BalanceGameContext } from "@/contexts/balanceGameContext.tsx";

export const useBalanceGameContext = () => {
    const context = useContext(BalanceGameContext);
    if (context === undefined) {
        throw new Error("useBalanceGameContext must be used within a BalanceGameProvider");
    }
    return context;
};
