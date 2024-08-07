import { motion } from "framer-motion";
import { DISSOLVE, SCROLL_MOTION } from "@/constants/animation.ts";
import { CasperDescription } from "@/features/Rush/CasperDescription.tsx";
import { CasperSection } from "@/features/Rush/CasperSection.tsx";
import { SectionKeyProps } from "@/types/sections.ts";

export function CasperFast({ id }: SectionKeyProps) {
    return (
        <CasperSection id={id}>
            <CasperDescription
                title={
                    <>
                        30분에
                        <br />
                        80% 충전
                    </>
                }
                subTitle="충전 속도가 아이폰보다 빨라요"
                description={[
                    "충전이 오래 걸릴까 걱정 되시나요?",
                    "캐스퍼 일렉트릭은 30분만 충전해도 배터리가 10%에서 80%까지 충전돼요.",
                    "대부분의 아이폰보다도 빠른 속도죠!",
                ]}
            />
            <motion.div className="flex gap-10" {...SCROLL_MOTION(DISSOLVE)}>
                <img
                    alt="capser fast-1"
                    src="/assets/rush/casper/fast-1.png"
                    className="w-[566px] h-[380px] object-cover rounded-300"
                />
                <img
                    alt="capser fast-2"
                    src="/assets/rush/casper/fast-2.png"
                    className="w-[620px] h-[380px] object-cover rounded-300"
                />
            </motion.div>
        </CasperSection>
    );
}
