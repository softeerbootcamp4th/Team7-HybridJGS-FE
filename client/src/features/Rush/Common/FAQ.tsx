import { memo } from "react";
import { motion } from "framer-motion";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import useLazyLoading from "@/hooks/useLazyLoading";
import { SectionKeyProps } from "@/types/sections.ts";

function FAQ({ id }: SectionKeyProps) {
    const { isInView, targetRef } = useLazyLoading<HTMLDivElement>();

    return (
        <section
            id={id}
            ref={targetRef}
            className="h-screen flex flex-col justify-center items-center gap-3 bg-n-neutral-300 snap-start"
        >
            {isInView && (
                <>
                    <motion.span
                        className="h-heading-2-bold text-n-neutral-950 flex flex-col justify-center items-center"
                        {...SCROLL_MOTION(ASCEND)}
                    >
                        <p>캐스퍼가 전기차로 돌아왔어요</p>
                        <p>전기차가 아직 낯설다구요?</p>
                    </motion.span>
                    <motion.p
                        className="h-body-1-regular text-n-neutral-950"
                        {...SCROLL_MOTION(ASCEND)}
                    >
                        전기차에 대한 작고 큰 오해들, 캐스퍼 일렉트릭과 함께 이번 기회에 풀어봐요
                    </motion.p>
                    <span className="flex flex-col gap-3 pt-7">
                        <motion.p
                            className="h-heading-3-bold h-[106px] w-[408px] rounded-800 py-8 px-6 bg-gradient-blue text-center"
                            {...SCROLL_MOTION(ASCEND)}
                        >
                            충전소를 찾기 어려울 것 같아요
                        </motion.p>
                        <motion.p
                            className="h-heading-3-bold h-[106px] w-[408px] rounded-800 py-8 px-6 bg-gradient-red text-center"
                            {...SCROLL_MOTION(ASCEND)}
                        >
                            주행 거리가 짧지 않나요?
                        </motion.p>
                        <motion.p
                            className="h-heading-3-bold h-[106px] w-[408px] rounded-800 py-8 px-6 bg-gradient-green text-center"
                            {...SCROLL_MOTION(ASCEND)}
                        >
                            충전이 너무 오래 걸릴 것 같아요
                        </motion.p>
                        <motion.p
                            className="h-heading-3-bold h-[106px] w-[408px] rounded-800 py-8 px-6 bg-gradient-yellow text-center"
                            {...SCROLL_MOTION(ASCEND)}
                        >
                            배터리 수명이 짧진 않나요?
                        </motion.p>
                    </span>
                </>
            )}
        </section>
    );
}

const MemoizedFAQ = memo(FAQ);
export { MemoizedFAQ as FAQ };
