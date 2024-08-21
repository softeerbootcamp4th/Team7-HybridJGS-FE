import { PropsWithChildren, forwardRef } from "react";
import { SectionKeyProps } from "@/types/sections.ts";

interface CasperSectionProps extends PropsWithChildren, SectionKeyProps {
    className?: string;
}
const CasperSection = forwardRef<HTMLDivElement, CasperSectionProps>(function CasperSection(
    { id, children, className },
    ref
) {
    return (
        <section
            ref={ref}
            id={id}
            className="h-screen flex flex-col items-center justify-center snap-start"
        >
            <div className={`w-[1200px] flex flex-col gap-16 ${className}`}>{children}</div>
        </section>
    );
});

export { CasperSection };
