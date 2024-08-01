import { ReactNode } from "react";
import CasperSubDescription from "@/features/Rush/CasperSubDescription.tsx";

interface CasperDescriptionProps {
    title: string | ReactNode;
    subTitle: string | ReactNode;
    description?: string[] | ReactNode;
}

export default function CasperDescription({
    title,
    subTitle,
    description,
}: CasperDescriptionProps) {
    return (
        <div className="flex gap-[42px]">
            <h2 className="h-heading-2-bold text-s-blue">{title}</h2>
            <CasperSubDescription subTitle={subTitle} description={description} />
        </div>
    );
}
