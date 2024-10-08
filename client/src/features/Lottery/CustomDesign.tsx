import { memo } from "react";
import { motion } from "framer-motion";
import { DISSOLVE, SCROLL_MOTION } from "@/constants/animation.ts";
import useLazyLoading from "@/hooks/useLazyLoading";
import { SectionKeyProps } from "@/types/sections.ts";
import { Description } from "./Description";
import { Section } from "./Section";

function CustomDesign({ id }: SectionKeyProps) {
    const { isInView, targetRef } = useLazyLoading<HTMLDivElement>();

    return (
        <Section id={id} ref={targetRef}>
            {isInView && (
                <div className="w-[1200px]">
                    <Description
                        label={<>커스텀 디자인</>}
                        title={<>나만의 취향을 반영해 마음껏 꾸며보세요!</>}
                        description={
                            <>
                                문 안쪽의 도어 가니쉬는 여러 용도로 커스텀하며 필요한 것들을 거치할
                                수 있어요.
                                <br />
                                친구들과의 사진을 꽂아놓거나 필요한 물건들을 놓고 라이프스타일에
                                맞게 마음껏 활용해보세요
                            </>
                        }
                    />

                    <motion.div className="mt-[98px] flex gap-700" {...SCROLL_MOTION(DISSOLVE)}>
                        <img
                            alt="커스텀 디자인 첫번째 이미지"
                            src="/assets/lottery/custom-design-1.jpg"
                            className="w-[588px] object-cover rounded-300"
                        />
                        <img
                            alt="커스텀 디자인 두번째 이미지"
                            src="/assets/lottery/custom-design-2.jpg"
                            className="w-[588px] object-cover rounded-300"
                        />
                    </motion.div>
                </div>
            )}
        </Section>
    );
}

const MemoizedCustomDesign = memo(CustomDesign);
export { MemoizedCustomDesign as CustomDesign };
