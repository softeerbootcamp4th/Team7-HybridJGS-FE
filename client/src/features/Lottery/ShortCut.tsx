import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";

interface ShortCutProps {
    handleClickShortCutButton: () => void;
}

export default function ShortCut({ handleClickShortCutButton }: ShortCutProps) {
    return (
        <div className="h-[623px] bg-n-black flex flex-col justify-center items-center text-center snap-start">
            <motion.img
                alt="캐스퍼 아이콘"
                src="/assets/common/casper.webp"
                className="w-[258px] h-[258px]"
                {...SCROLL_MOTION(ASCEND)}
            />
            <div className="h-[26px]" />
            <motion.h3 className="h-heading-3-bold text-n-white" {...SCROLL_MOTION(ASCEND)}>
                나만의 캐스퍼 일렉트릭 봇을 만들면
                <br />
                캐스퍼 일렉트릭부터 스타벅스 기프티콘까지 선물이 가득!
            </motion.h3>
            <div className="h-[30px]" />
            <motion.div {...SCROLL_MOTION(ASCEND)}>
                <CTAButton
                    label="캐스퍼 일렉트릭 봇 만들러 가기"
                    hasArrowIcon
                    onClick={handleClickShortCutButton}
                />
            </motion.div>
        </div>
    );
}
