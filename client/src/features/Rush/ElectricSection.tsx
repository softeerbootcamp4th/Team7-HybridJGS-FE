import { ReactNode } from "react";
import Tooltip from "@/components/Tooltip";

interface ElectricSectionProps {
    tooltipContent: string;
    tooltipChildren: ReactNode;
    children: ReactNode;
    descriptionClass?: string;
    descriptionChildren: ReactNode;
}

export function ElectricSection({
    tooltipContent,
    tooltipChildren,
    children,
    descriptionClass,
    descriptionChildren,
}: ElectricSectionProps) {
    return (
        <section className="h-screen bg-n-white flex flex-col justify-center items-center pt-32">
            <Tooltip content={tooltipContent} tooltipPosition="right">
                {tooltipChildren}
            </Tooltip>
            <span className={`h-body-1-regular text-n-neutral-950 mt-2 mb-8 ${descriptionClass}`}>
                {descriptionChildren}
            </span>
            {children}
        </section>
    );
}
