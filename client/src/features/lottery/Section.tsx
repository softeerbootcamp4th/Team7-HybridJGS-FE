import { PropsWithChildren } from "react";

interface SectionProps extends PropsWithChildren {
    className?: string;
}

export default function Section({ children, className }: SectionProps) {
    return (
        <section
            className={`h-screen relative flex flex-col items-center justify-center ${className}`}
        >
            {children}
        </section>
    );
}
