import { ReactNode } from "react";

interface CardData {
    image: string;
    title: ReactNode;
    description: string[];
}

interface ElectricReasonCardProps {
    data: CardData;
}

export default function ElectricReasonCard({ data }: ElectricReasonCardProps) {
    return (
        <div className="flex flex-col justify-center items-center p-8 h-[600px] w-[730px] mt-8 gap-8 rounded-500 border-2">
            <img src={data.image} alt="card image" className="h-[380px] w-[666px]" />
            <span className="flex flex-col justify-between items-center gap-3">
                <span className="h-heading-3-bold text-n-neutral-950">{data.title}</span>
                <span className="h-body-2-regular text-nowrap flex flex-col justify-center items-center">
                    {data.description.map((line, idx) => (
                        <p key={idx}>{line}</p>
                    ))}
                </span>
            </span>
        </div>
    );
}
