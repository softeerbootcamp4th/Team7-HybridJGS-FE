import { memo } from "react";
import { motion } from "framer-motion";
import Tooltip from "@/components/Tooltip";
import { DISSOLVE, SCROLL_MOTION } from "@/constants/animation.ts";
import useLazyLoading from "@/hooks/useLazyLoading";
import { SectionKeyProps } from "@/types/sections.ts";
import { Description } from "./Description";
import { Section } from "./Section";

function SmileBadge({ id }: SectionKeyProps) {
    const { isInView, targetRef } = useLazyLoading<HTMLDivElement>();

    return (
        <Section id={id} ref={targetRef} className="bg-n-neutral-50 overflow-hidden relative">
            {isInView && (
                <>
                    <img
                        alt="캐스퍼 뒷면 이미지"
                        src="/assets/lottery/casper-back.jpg"
                        className="w-[648px] absolute left-0 top-[197px]"
                    />
                    <motion.img
                        alt="확대 아이콘"
                        src="/assets/lottery/scale-triangle.svg"
                        className="w-[490px] absolute left-[182px] top-[393px]"
                        {...SCROLL_MOTION(DISSOLVE)}
                    />
                    <motion.img
                        alt="캐스퍼 확대 이미지"
                        src="/assets/lottery/casper-badge.jpg"
                        className="absolute left-[668px] top-[393px] w-[792px] h-[460px] rounded-300"
                        {...SCROLL_MOTION(DISSOLVE)}
                    />
                    <div className="absolute left-[668px] top-[156px]">
                        <Description
                            label={
                                <>
                                    스마일
                                    <br />
                                    로봇 뱃지
                                </>
                            }
                            title={
                                <>
                                    캐스퍼 일렉트릭의 뒷문에서
                                    <br />
                                    저를 찾아주세요
                                </>
                            }
                            description={
                                <>
                                    캐스퍼 일렉트릭의 뒷문 손잡이 위쪽에 로봇 얼굴 뱃지가 생겼어요.
                                    <br />
                                    다양한 표정으로 커스터마이징도 가능하답니다.
                                </>
                            }
                        />
                    </div>
                    <motion.div {...SCROLL_MOTION(DISSOLVE)}>
                        <Tooltip
                            content={
                                <>
                                    나를 예쁘게 꾸미고 공유하면
                                    <br />
                                    캐스퍼 일렉트릭을 가질 수 있어
                                </>
                            }
                            isVisible
                            tooltipPosition="right"
                            absolutePosition={{ left: 884, top: 568 }}
                        />
                    </motion.div>
                </>
            )}
        </Section>
    );
}

const MemoizedSmileBadge = memo(SmileBadge);
export { MemoizedSmileBadge as SmileBadge };
