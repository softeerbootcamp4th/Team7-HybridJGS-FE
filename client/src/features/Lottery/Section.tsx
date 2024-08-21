import { PropsWithChildren, forwardRef } from "react";
import { SectionKeyProps } from "@/types/sections.ts";

interface SectionProps extends PropsWithChildren, SectionKeyProps {
    className?: string;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(function Section(
    { id, children, className },
    ref
) {
    return (
        <section
            id={id}
            ref={ref}
            className={`h-screen relative flex flex-col items-center justify-center snap-start ${className}`}
        >
            {children}
        </section>
    );
});

export { Section };
