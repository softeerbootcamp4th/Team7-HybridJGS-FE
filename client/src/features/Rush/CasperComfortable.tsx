import { motion } from "framer-motion";
import { DISSOLVE, SCROLL_MOTION } from "@/constants/animation.ts";
import CasperDescription from "@/features/Rush/CasperDescription.tsx";
import CasperSection from "@/features/Rush/CasperSection.tsx";
import { SectionKeyProps } from "@/types/sections.ts";

export default function CasperComfortable({ id }: SectionKeyProps) {
    return (
        <CasperSection id={id}>
            <CasperDescription
                title={
                    <>
                        국내 최초 페달 오조작
                        <br />
                        방지 기능 탑재
                    </>
                }
                subTitle={
                    <>
                        초보 운전자를 위한
                        <br />
                        안전하고 편안한 운전을 도와줄 수 있어요
                    </>
                }
            />
            <motion.div className="flex gap-10" {...SCROLL_MOTION(DISSOLVE)}>
                <div className="flex flex-col gap-2">
                    <img
                        alt="capser comfortable-1"
                        src="/assets/rush/casper/comfortable-1.png"
                        className="w-[588px] h-[380px] object-cover rounded-300"
                    />
                    <span className="flex gap-6 text-n-neutral-950">
                        <p className="h-heading-4-bold">페달 오조작 안전 보조(PMSA)</p>
                        <p className="h-body-1-regular">
                            장애물이 가까울 때 악셀 페달을 실수로 밟으면
                            <br />
                            스스로 멈춰서는 페달 오조작 안전 보조(PMSA) 기능이,
                            <br />
                            국내 최초로 캐스퍼 일렉트릭에 기본 사양으로 탑재되었어요.
                        </p>
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <img
                        alt="capser comfortable-2"
                        src="/assets/rush/casper/comfortable-2.png"
                        className="w-[588px] h-[380px] object-cover rounded-300"
                    />
                    <span className="flex gap-6 text-n-neutral-950">
                        <p className="h-heading-4-bold">현대 스마트센스 옵션</p>
                        <p className="h-body-1-regular">
                            기존 캐스퍼에서는 쓸 수 없었던 현대 스마트센스 옵션이 지원되면서,
                            <br />
                            누가 갑자기 끼어들었을 때 충돌 위험을 막아주고, 차선 이탈을 알아서
                            <br />
                            잡아주는 등 다양한 안전 기술을 사용할 수 있어요.
                        </p>
                    </span>
                </div>
            </motion.div>
        </CasperSection>
    );
}
