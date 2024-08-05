import { useContext } from "react";
import { CasperCustomDispatchType } from "@/types/casperCustom";
import { CasperCustomDispatchContext } from "../contexts/casperCustomContext";

export default function useCasperCustomDispatchContext(): CasperCustomDispatchType {
    const context = useContext(CasperCustomDispatchContext);
    if (context === null) {
        throw new Error(
            "casperCustomDispatchContext must be used within a useCasperCustomDispatchProvider"
        );
    }
    return context;
}
