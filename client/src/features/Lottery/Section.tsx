import { PropsWithChildren } from "react";
import { SectionKeyProps } from "@/types/sections.ts";

interface SectionProps extends PropsWithChildren, SectionKeyProps {
    className?: string;
}

export function Section({ id, children, className }: SectionProps) {
    return (
        <section
            id={id}
            className={`h-screen relative flex flex-col items-center justify-center snap-start ${className}`}
        >
            {children}
        </section>
    );
}
