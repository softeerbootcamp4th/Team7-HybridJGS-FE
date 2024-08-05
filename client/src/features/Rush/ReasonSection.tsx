import { ReactNode } from "react";

interface ReasonSectionProps {
    subtitle: string;
    children: ReactNode;
}

export default function ReasonSection({ subtitle, children }: ReasonSectionProps) {
    return (
        <section className="h-[316px] bg-n-neutral-50 flex flex-col justify-center items-center gap-3 snap-start">
            <p className="h-body-1-regular text-n-neutral-500">{subtitle}</p>
            <span className="h-heading-2-bold text-n-neutral-950 flex flex-col justify-center items-center">
                {children}
            </span>
        </section>
    );
}
