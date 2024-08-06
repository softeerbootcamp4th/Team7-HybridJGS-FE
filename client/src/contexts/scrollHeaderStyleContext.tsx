import { ReactNode, createContext, useMemo, useState } from "react";
import { SectionKey } from "@/types/scrollHeaderStyle.ts";

type HeaderType = "light" | "dark";

interface ScrollHeaderStyleType {
    activeSection: SectionKey;
    setActiveSection: (section: SectionKey) => void;
    headerType: HeaderType;
    setHeaderType: (type: HeaderType) => void;
}

export const ScrollHeaderStyleContext = createContext<ScrollHeaderStyleType | null>(null);

export const ScrollHeaderStyleProvider = ({ children }: { children: ReactNode }) => {
    const [activeSection, setActiveSection] = useState<SectionKey>("HEADLINE");
    const [headerType, setHeaderType] = useState<HeaderType>("light");

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
