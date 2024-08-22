import { useContext } from "react";
import { CasperCustomStateType } from "@/types/casperCustom.ts";
import { CasperCustomStateContext } from "../../contexts/casperCustomContext.tsx";

export default function useCasperCustomStateContext(): CasperCustomStateType {
    const context = useContext(CasperCustomStateContext);
    if (context === null) {
        throw new Error(
            "casperCustomStateContext must be used within a useCasperCustomStateProvider"
        );
    }
    return context;
}
