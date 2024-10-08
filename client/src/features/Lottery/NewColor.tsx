import { memo } from "react";
import { motion } from "framer-motion";
import { DISSOLVE, SCROLL_MOTION } from "@/constants/animation.ts";
import useLazyLoading from "@/hooks/useLazyLoading";
import { SectionKeyProps } from "@/types/sections.ts";
import { Description } from "./Description";
import { Section } from "./Section";

function NewColor({ id }: SectionKeyProps) {
    const { isInView, targetRef } = useLazyLoading<HTMLDivElement>();

    return (
        <Section id={id} ref={targetRef} className="bg-n-neutral-50">
            {isInView && (
                <>
                    <Description
                        direction="vertical"
                        label={<>ONLY 캐스퍼 일렉트릭</>}
                        title={<>5종의 신규 컬러가 새롭게 출시되었어요</>}
                        description={
                            <>
                                기존 캐스퍼에는 없었던 5개의 신규 컬러가 추가되면서
                                <br />
                                9종의 기본 컬러와 4종의 투톤 컬러를 자유롭게 선택할 수 있어요!
                            </>
                        }
                    />

                    <motion.div className="mt-[86px]" {...SCROLL_MOTION(DISSOLVE)}>
                        <img alt="캐스퍼 신규 컬러 목록" src="/assets/lottery/casper-list.webp" />
                    </motion.div>
                </>
            )}
        </Section>
    );
}

const MemoizedNewColor = memo(NewColor);
export { MemoizedNewColor as NewColor };
