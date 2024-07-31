import { useState } from "react";
import Toggle from "@/components/Toggle";
import Tooltip from "@/components/Tooltip";

const TOGGLE_OPTIONS = [
    "혜택이 늘어요",
    "충전소가 늘어요",
    "유지비가 줄어요",
    "환경오염이 줄어요",
    "소음이 줄어요",
];

export default function ElectricReason() {
    const [selectedIdx, setSelectedIdx] = useState(0);

    const handleToggle = (idx: number) => {
        setSelectedIdx(idx);
    };

    return (
        <section className="h-screen bg-n-white flex flex-col justify-center items-center pt-32">
            <Tooltip
                content="캐스퍼 일렉트릭은 첫 차로도, 세컨드 카로도 딱이에요"
                tooltipPosition="right"
            >
                <p className="h-heading-2-bold">전기차를 사야 하는 5가지 이유</p>
            </Tooltip>
            <span className="h-body-1-regular text-n-neutral-950 mt-2 mb-8">
                <p>궁금한 문장을 </p>
                <p className="h-body-1-bold text-s-blue">클릭</p>
                <p>해 세부 내용을 확인해보세요</p>
            </span>
            <Toggle
                handleToggle={handleToggle}
                options={TOGGLE_OPTIONS}
                selectedIdx={selectedIdx}
            />
            <div className="flex flex-col justify-center items-center p-8 h-[600px] w-[730px] mt-8 gap-10 rounded-500 border-2">
                <img
                    src="/assets/rush/electric/ranc.jpg"
                    alt="RANC"
                    className="h-[380px] w-[666px]"
                />
                <span className="flex flex-col justify-between items-center gap-3">
                    <span className="h-heading-3-bold">
                        <p className="text-n-neutral-950">노면소음을 줄이는 </p>
                        <p className="text-s-blue">RANC기술</p>
                    </span>
                    <span className="h-body-2-regular text-nowrap flex flex-col justify-center items-center">
                        <p>
                            현대차는 능동형 소음 저감 기술(ANC)을 넘어 노면 소음을 줄이는
                            RANC(Road-noise Active Noise Control) 기술을 개발했어요.
                        </p>
                        <p>RANC는 특히 저주파 대의 노면소음을 효과적으로 줄이며,</p>
                        <p>
                            포장된 지 오래된 아스팔트 노면이나 교량 연결부의 소음을 약 3dB 감소시켜
                            소음 에너지를 절반 수준으로 낮춘답니다.
                        </p>
                    </span>
                </span>
            </div>
        </section>
    );
}
