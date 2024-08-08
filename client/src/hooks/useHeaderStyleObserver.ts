import { useEffect, useRef } from "react";
import useScrollHeaderStyleContext from "@/hooks/useScrollHeaderStyleContext";
import { HeaderType } from "@/types/scrollHeaderStyle";
import { SectionKey } from "@/types/sections.ts";

interface HeaderStyleConfig {
    darkSections: SectionKey[];
}

export default function useHeaderStyleObserver(config: HeaderStyleConfig) {
    const { setActiveSection, setHeaderType } = useScrollHeaderStyleContext();
    const containerRef = useRef<HTMLDivElement>(null);
    const visibleSectionsRef = useRef<Set<SectionKey>>(new Set());

    const updateVisibleSections = (
        entries: IntersectionObserverEntry[],
        newVisibleSections: Set<SectionKey>
    ) => {
        entries.forEach((entry) => {
            const sectionId = entry.target.id as SectionKey;
            if (entry.isIntersecting) newVisibleSections.add(sectionId);
            else newVisibleSections.delete(sectionId);
        });
        visibleSectionsRef.current = newVisibleSections;
    };

    const updateHeaderStyle = (newVisibleSections: Set<SectionKey>) => {
        const mostTopSection = Array.from(newVisibleSections)[0];
        if (mostTopSection) {
            setActiveSection(mostTopSection);
            const newHeaderType: HeaderType = config.darkSections.includes(mostTopSection)
                ? "dark"
                : "light";
            setHeaderType(newHeaderType);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const newVisibleSections = new Set(visibleSectionsRef.current);
                updateVisibleSections(entries, newVisibleSections);
                updateHeaderStyle(newVisibleSections);
            },
            {
                root: containerRef.current,
                threshold: 0.8,
            }
        );

        const sections = document.querySelectorAll("section");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [setActiveSection, setHeaderType, config.darkSections]);

    return containerRef;
}
