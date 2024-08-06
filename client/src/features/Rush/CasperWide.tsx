import { motion } from "framer-motion";
import { DISSOLVE, SCROLL_MOTION } from "@/constants/animation.ts";
import CasperDescription from "@/features/Rush/CasperDescription.tsx";
import CasperSection from "@/features/Rush/CasperSection.tsx";

export default function CasperWide() {
    return (
        <CasperSection className="items-end">
            <CasperDescription
                title={
                    <>
                        풀 폴딩 시트로
                        <br />
                        차박하기
                    </>
                }
                subTitle="실내 공간이 여유롭게 넓어졌어요"
                description={
                    <>
                        캐스퍼 일렉트릭은 캐스퍼에 비해 크기가 더 커지면서, 다리를 둘 수 있는 공간이
                        더 여유로워졌어요.
                        <br />
                        또 1열과 2열의 의자를 모두 완전히 접을 수 있어 차박을 하거나, 골프백도 넣을
                        수 있어요.
                        <br />
                        <br />
                        *전장 3,825mm, 전폭 1,610mm, 전고 1,575mm, 휠베이스 2,580mm
                    </>
                }
            />
            <motion.div className="flex gap-10" {...SCROLL_MOTION(DISSOLVE)}>
                <div className="flex flex-col gap-2">
                    <img
                        alt="capser wide-1"
                        src="/assets/rush/casper/wide-1.png"
                        className="w-[560px] h-[380px] object-cover rounded-300"
                    />
                    <p className="h-heading-4-bold text-n-neutral-950">
                        2열 슬라이딩 & 리클라이닝 시트
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <img
                        alt="capser wide-2"
                        src="/assets/rush/casper/wide-2.png"
                        className="w-[412px] h-[380px] object-cover rounded-300"
                    />
                    <p className="h-heading-4-bold text-n-neutral-950">풀 폴딩 시트(전좌석)</p>
                </div>
            </motion.div>
        </CasperSection>
    );
}
