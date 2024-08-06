import { ElectricSection } from "@/features/Rush/ElectricSection.tsx";
import { SectionKey } from "@/types/scrollHeaderStyle.ts";

interface ElectricAdvantageProps {
    id: SectionKey;
}

export default function ElectricAdvantage({ id }: ElectricAdvantageProps) {
    return (
        <ElectricSection
            id={id}
            tooltipContent="캐스퍼 일렉트릭은 첫 차로도, 세컨드 카로도 딱이에요"
            tooltipChildren={
                <span className="flex flex-col justify-center items-center h-heading-2-bold">
                    <p>다른 전기차에 비해 가격 부담이 적어요</p>
                    <p>전기차 가격의 혁신을 이뤄냈거든요</p>
                </span>
            }
            descriptionClass="flex flex-col justify-center items-center"
            descriptionChildren={
                <>
                    <span>
                        <p>
                            캐스퍼 일렉트릭은 전기차를 대중적으로 사용하게 하는걸 목표로, 일반적인
                            전기차들보다{" "}
                        </p>
                        <p className="h-body-1-bold text-s-blue">
                            훨씬 저렴하게 나온 도심형 전기차
                        </p>
                        <p>예요.</p>
                    </span>
                    <p>
                        도시 주행에 필요한 기능만 알차게 담아, 일반적으로 다른 전기차 모델보다 20%
                        저렴한 가격에 구매할 수 있어요.
                    </p>
                </>
            }
        >
            <div className="flex justify-between items-center h-[336px] w-[797px] mt-8 gap-25">
                <div className="h-[336px] w-[367px] flex flex-col">
                    <div className="flex items-end">
                        <div className="flex-1 flex-col justify-center items-center gap-[6px] px-6">
                            <p className="h-heading-3-bold text-s-red text-nowrap">2957만</p>
                            <div className="w-[72px] h-[130px] bg-gradient-red rounded-t-400" />
                        </div>
                        <div className="flex-1 flex-col justify-center items-center gap-[6px] px-6">
                            <p className="h-heading-3-bold text-n-neutral-950 text-nowrap">
                                4671만
                            </p>
                            <div className="w-[72px] h-[216px] bg-gradient-green rounded-t-400" />
                        </div>
                        <div className="flex-1 flex-col justify-center items-center gap-[6px] px-6">
                            <p className="h-heading-3-bold text-n-neutral-950 text-nowrap">
                                5213만
                            </p>
                            <div className="w-[72px] h-[246px] bg-gradient-green rounded-t-400" />
                        </div>
                    </div>
                    <span className="w-[367px] h-body-1-bold flex justify-between border-t border-n-neutral-500 pt-4">
                        <p className="text-s-red flex-1 text-center">캐스퍼 일렉트릭</p>
                        <p className="text-n-neutral-500 flex-1 text-center">소형 SUV</p>
                        <p className="text-n-neutral-500 flex-1 text-center">중형 SUV</p>
                    </span>
                </div>
                <div className="h-[330px] w-[330px] bg-gradient-red rounded-800 flex flex-col justify-center items-center gap-2">
                    <p className="h-heading-1-bold text-n-neutral-950 text-nowrap">2957만 원*</p>
                    <span className="h-body-1-regular text-n-neutral-500 flex flex-col justify-center items-center">
                        <p>Inspiration 트림 기준</p>
                        <p>세금감면 시(옵션 제외)</p>
                    </span>
                </div>
            </div>
        </ElectricSection>
    );
}
