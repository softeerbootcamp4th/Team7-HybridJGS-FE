import { useEffect, useRef } from "react";
import useScrollHeaderStyleContext from "@/hooks/useScrollHeaderStyleContext";
import { HeaderType, SectionKey } from "@/types/scrollHeaderStyle";

interface HeaderStyleConfig {
    darkSections: SectionKey[];
}

export const useHeaderStyleObserver = (config: HeaderStyleConfig) => {
    const { setActiveSection, setHeaderType } = useScrollHeaderStyleContext();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id as SectionKey;
                        setActiveSection(sectionId);
                        const newHeaderType: HeaderType = config.darkSections.includes(sectionId)
                            ? "dark"
                            : "light";
                        setHeaderType(newHeaderType);
                    }
                });
            },
            {
                root: containerRef.current,
                threshold: 0.5,
            }
        );

        const sections = document.querySelectorAll("section");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [setActiveSection, setHeaderType, config.darkSections]);

    return containerRef;
};
