import { motion } from "framer-motion";
import { DISSOLVE } from "@/constants/animation.ts";
import CasperDescription from "@/features/Rush/CasperDescription.tsx";
import CasperSection from "@/features/Rush/CasperSection.tsx";

export default function CasperCharge() {
    return (
        <CasperSection>
            <CasperDescription
                title={
                    <>
                        차 안에서도 밖에서도
                        <br />
                        충전 가능
                    </>
                }
                subTitle="캠핑갈 때 전원을 챙길 필요 없어요"
                description={[
                    "캠핑갈 때마다 무겁게 전원 배터리를 챙기셨나요?",
                    "캐스퍼 일렉트릭만 있으면 언제 어디서든 전자기기 사용이 가능해요.",
                ]}
            />
            <motion.div className="flex gap-10" {...DISSOLVE}>
                <div className="flex flex-col gap-2">
                    <img
                        alt="capser charge-1"
                        src="/assets/rush/casper/charge-1.png"
                        className="w-[412px] h-[380px] object-cover rounded-300"
                    />
                    <p className="h-heading-4-bold text-n-neutral-950">차 안에서 충전</p>
                </div>
                <div className="flex flex-col gap-2">
                    <img
                        alt="capser charge-2"
                        src="/assets/rush/casper/charge-2.png"
                        className="w-[560px] h-[380px] object-cover rounded-300"
                    />
                    <p className="h-heading-4-bold text-n-neutral-950">차 밖에서 충전</p>
                </div>
            </motion.div>
        </CasperSection>
    );
}
