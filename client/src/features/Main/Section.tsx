import { PropsWithChildren } from "react";
import CTAButton from "@/components/CTAButton";

interface SectionProps extends PropsWithChildren {
    backgroundColor?: string;
    title?: string;
    titleColor?: string;
    subtitle?: string;
    description?: string;
    descriptionColor?: string;
    url?: string;
}

export default function Section({
    backgroundColor,
    title,
    titleColor,
    subtitle,
    description,
    descriptionColor,
    children,
    url,
}: SectionProps) {
    return (
        <section
            className={`flex flex-col gap-3 justify-center items-center h-screen ${backgroundColor}`}
        >
            <p className={`h-body-1-regular ${titleColor}`}>{title}</p>
            <p className={`h-heading-2-bold ${titleColor}`}>{subtitle}</p>
            <p className={`h-body-1-medium ${descriptionColor}`}>{description}</p>
            {children}
            <CTAButton label="이벤트 참여하기" hasArrowIcon={true} url={url} />
        </section>
    );
}
