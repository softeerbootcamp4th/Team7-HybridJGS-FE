import { PropsWithChildren } from "react";
import { SectionKeyProps } from "@/types/sections.ts";

interface CasperSectionProps extends PropsWithChildren, SectionKeyProps {
    className?: string;
}
export function CasperSection({ id, children, className }: CasperSectionProps) {
    return (
        <section id={id} className="h-screen flex flex-col items-center justify-center snap-start">
            <div className={`w-[1200px] flex flex-col gap-16 ${className}`}>{children}</div>
        </section>
    );
}
