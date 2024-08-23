import { memo } from "react";
import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import useLazyLoading from "@/hooks/useLazyLoading";
import { SectionKeyProps } from "@/types/sections.ts";

interface ShortCutProps extends SectionKeyProps {
    handleClickShortCutButton: () => void;
}

function ShortCut({ id, handleClickShortCutButton }: ShortCutProps) {
    const { isInView, targetRef } = useLazyLoading<HTMLDivElement>();

    return (
        <motion.section
            id={id}
            ref={targetRef}
            className="h-[623px] bg-n-black flex flex-col justify-center items-center text-center snap-start"
            {...SCROLL_MOTION(ASCEND)}
        >
            {isInView && (
                <>
                    <img
                        alt="캐스퍼 아이콘"
                        src="/assets/common/casper.webp"
                        className="w-[258px] h-[258px]"
                    />
                    <div className="h-[26px]" />
                    <h3 className="h-heading-3-bold text-n-white">
                        나만의 캐스퍼 일렉트릭 봇을 만들면
                        <br />
                        캐스퍼 일렉트릭부터 스타벅스 기프티콘까지 선물이 가득!
                    </h3>
                    <div className="h-[30px]" />
                    <CTAButton
                        label="캐스퍼 일렉트릭 봇 만들러 가기"
                        hasArrowIcon
                        onClick={handleClickShortCutButton}
                    />
                </>
            )}
        </motion.section>
    );
}

const MemoizedShortCut = memo(ShortCut);
export { MemoizedShortCut as ShortCut };
