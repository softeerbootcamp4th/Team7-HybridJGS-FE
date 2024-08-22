import { useContext } from "react";
import { CasperCustomDispatchType } from "@/types/casperCustom.ts";
import { CasperCustomDispatchContext } from "../../contexts/casperCustomContext.tsx";

export default function useCasperCustomDispatchContext(): CasperCustomDispatchType {
    const context = useContext(CasperCustomDispatchContext);
    if (context === null) {
        throw new Error(
            "casperCustomDispatchContext must be used within a useCasperCustomDispatchProvider"
        );
    }
    return context;
}
