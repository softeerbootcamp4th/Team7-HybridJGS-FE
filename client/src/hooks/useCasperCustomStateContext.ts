import { useContext } from "react";
import { CasperCustomStateType } from "@/types/casperCustom";
import { CasperCustomStateContext } from "../contexts/casperCustomContext";

export default function useCasperCustomStateContext(): CasperCustomStateType {
    const context = useContext(CasperCustomStateContext);
    if (context === null) {
        throw new Error(
            "casperCustomStateContext must be used within a useCasperCustomStat4eProvider"
        );
    }
    return context;
}
