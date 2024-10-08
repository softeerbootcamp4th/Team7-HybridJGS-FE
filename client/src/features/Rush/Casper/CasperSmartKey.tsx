import { memo } from "react";
import { motion } from "framer-motion";
import { DISSOLVE, SCROLL_MOTION } from "@/constants/animation.ts";
import { CasperSubDescription } from "@/features/Rush/Casper/CasperSubDescription.tsx";
import useLazyLoading from "@/hooks/useLazyLoading";
import { SectionKeyProps } from "@/types/sections.ts";

function CasperSmartKey({ id }: SectionKeyProps) {
    const { isInView, targetRef } = useLazyLoading<HTMLDivElement>();

    return (
        <section
            id={id}
            ref={targetRef}
            className="h-[800px] flex gap-10 justify-center items-center snap-start"
        >
            {isInView && (
                <>
                    <motion.img
                        alt="capser smart key"
                        src="/assets/rush/casper/smart-key.png"
                        className="w-[570px] h-[380px] object-cover rounded-300"
                        {...SCROLL_MOTION(DISSOLVE)}
                    />
                    <CasperSubDescription
                        subTitle="스마트 키를 사용할 수 있어요"
                        description={[
                            "내연기관 캐스퍼에는 들어가지 않았던 디지털 키를 캐스퍼 일렉트릭에서는 이용할 수 있어요.",
                            "실물 자동차 키를 소지하지 않아도, 스마트폰이나 스마트 워치만으로 차 문을 열 수 있게 되었죠.",
                            "(최대 7개의 디바이스까지 키 등록 가능)",
                        ]}
                    />
                </>
            )}
        </section>
    );
}

const MemoizedCasperSmartKey = memo(CasperSmartKey);
export { MemoizedCasperSmartKey as CasperSmartKey };
