import { memo } from "react";
import { ReasonSection } from "@/features/Rush/Reason/ReasonSection.tsx";
import useLazyLoading from "@/hooks/useLazyLoading";
import { SectionKeyProps } from "@/types/sections.ts";

function ReasonSecond({ id }: SectionKeyProps) {
    const { isInView, targetRef } = useLazyLoading<HTMLDivElement>();

    return (
        <ReasonSection
            id={id}
            ref={targetRef}
            subtitle="캐스퍼 일렉트릭으로 전기차를 입문해야하는 이유"
        >
            {isInView && (
                <>
                    <p className="text-s-blue">라이프스타일 그대로</p>
                    <p>캐스퍼 일렉트릭과 함께해요</p>
                </>
            )}
        </ReasonSection>
    );
}

const MemoizedReasonSecond = memo(ReasonSecond);
export { MemoizedReasonSecond as ReasonSecond };
