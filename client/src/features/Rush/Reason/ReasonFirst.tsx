import { memo } from "react";
import { ReasonSection } from "@/features/Rush/Reason/ReasonSection.tsx";
import useLazyLoading from "@/hooks/useLazyLoading";
import { SectionKeyProps } from "@/types/sections.ts";

function ReasonFirst({ id }: SectionKeyProps) {
    const { isInView, targetRef } = useLazyLoading<HTMLDivElement>();

    return (
        <ReasonSection
            ref={targetRef}
            id={id}
            subtitle="캐스퍼 일렉트릭으로 전기차를 입문해야하는 이유"
        >
            {isInView && (
                <>
                    <p>전기차가 처음이라면</p>
                    <span>
                        <p>캐스퍼 일렉트릭의 뛰어난 </p>
                        <p className="text-s-blue">성능</p>
                        <p>에 놀라실 거예요</p>
                    </span>
                </>
            )}
        </ReasonSection>
    );
}

const MemoizedReasonFirst = memo(ReasonFirst);
export { MemoizedReasonFirst as ReasonFirst };
