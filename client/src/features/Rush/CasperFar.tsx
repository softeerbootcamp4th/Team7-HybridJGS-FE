import { memo } from "react";
import { motion } from "framer-motion";
import { DISSOLVE, SCROLL_MOTION } from "@/constants/animation.ts";
import { CasperDescription } from "@/features/Rush/CasperDescription.tsx";
import { CasperSection } from "@/features/Rush/CasperSection.tsx";
import { SectionKeyProps } from "@/types/sections.ts";

function CasperFar({ id }: SectionKeyProps) {
    return (
        <CasperSection id={id}>
            <CasperDescription
                title="315km"
                subTitle="한 번만 충전해도 멀리 갈 수 있어요"
                description={[
                    "캐스퍼 일렉트릭은 소형 전기차인데도, 한 번 충전했을 때 315km를 갈 수 있어요.",
                    "한 번만 충전해도 서울에서 인천까지 9번 운전할 수 있을 정도로, 수도권에 산다면 서울 출퇴근에 활용하기 좋아요.",
                ]}
            />
            <motion.div className="flex gap-10" {...SCROLL_MOTION(DISSOLVE, 0.5)}>
                <img
                    alt="capser far-1"
                    src="/assets/rush/casper/far-1.png"
                    className="w-[660px] h-[380px] object-cover rounded-300"
                />
                <img
                    alt="capser far-2"
                    src="/assets/rush/casper/far-2.jpeg"
                    className="w-[516px] h-[380px] object-cover rounded-300"
                />
            </motion.div>
        </CasperSection>
    );
}

const MemoizedCasperFar = memo(CasperFar);
export { MemoizedCasperFar as CasperFar };
