import { useState } from "react";
import Toggle from "@/components/Toggle";
import { CARD_DATA, TOGGLE_OPTIONS } from "@/constants/Rush/electricCardData.tsx";
import ElectricReasonCard from "@/features/Rush/ElectricReasonCard.tsx";
import { ElectricSection } from "@/features/Rush/ElectricSection.tsx";
import { SectionKey } from "@/types/scrollHeaderStyle.ts";

interface ElectricReasonProps {
    id: SectionKey;
}

export default function ElectricReason({ id }: ElectricReasonProps) {
    const [selectedIdx, setSelectedIdx] = useState(0);

    const handleToggle = (idx: number) => {
        setSelectedIdx(idx);
    };

    return (
        <ElectricSection
            id={id}
            tooltipContent="현대는 왜 전기차에 집중할까요?"
            tooltipChildren={<p className="h-heading-2-bold">전기차를 사야 하는 5가지 이유</p>}
            descriptionChildren={
                <>
                    <p>궁금한 문장을 </p>
                    <p className="h-body-1-bold text-s-blue">클릭</p>
                    <p>해 세부 내용을 확인해보세요</p>
                </>
            }
        >
            <Toggle
                handleToggle={handleToggle}
                options={TOGGLE_OPTIONS}
                selectedIdx={selectedIdx}
            />
            <ElectricReasonCard data={CARD_DATA[selectedIdx]} />
        </ElectricSection>
    );
}
