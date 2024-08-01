import { PropsWithChildren } from "react";

interface CasperSectionProps extends PropsWithChildren {
    className?: string;
}
export default function CasperSection({ children, className }: CasperSectionProps) {
    return (
        <section className="h-screen flex flex-col items-center justify-center">
            <div className={`w-[1200px] flex flex-col gap-16 ${className}`}>{children}</div>
        </section>
    );
}
