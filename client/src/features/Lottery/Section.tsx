import { PropsWithChildren } from "react";
import { SectionKey } from "@/types/scrollHeaderStyle.ts";

interface SectionProps extends PropsWithChildren {
    id: SectionKey;
    className?: string;
}

export default function Section({ id, children, className }: SectionProps) {
    return (
        <section
            id={id}
            className={`h-screen relative flex flex-col items-center justify-center snap-start ${className}`}
        >
            {children}
        </section>
    );
}
