import { ReactNode, createContext, useMemo, useState } from "react";
import { HeaderType, ScrollHeaderStyleType } from "@/types/scrollHeaderStyle.ts";
import { SectionKey } from "@/types/sections.ts";

export const ScrollHeaderStyleContext = createContext<ScrollHeaderStyleType | null>(null);

export const ScrollHeaderStyleProvider = ({ children }: { children: ReactNode }) => {
    const [activeSection, setActiveSection] = useState<SectionKey>("HEADLINE");
    const [headerType, setHeaderType] = useState<HeaderType>("dark");

    const value = useMemo(
        () => ({
            activeSection,
            setActiveSection,
            headerType,
            setHeaderType,
        }),
        [activeSection, headerType]
    );

    return (
        <ScrollHeaderStyleContext.Provider value={value}>
            {children}
        </ScrollHeaderStyleContext.Provider>
    );
};
