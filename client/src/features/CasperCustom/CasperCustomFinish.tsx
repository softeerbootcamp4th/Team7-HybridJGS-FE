import CTAButton from "@/components/CTAButton";
import useCasperCustomContext from "@/hooks/useCasperCustomContext";
import CasperCardFront from "./CasperCardFront";
import ArrowIcon from "/public/assets/icons/arrow.svg?react";

export default function CasperCustomFinish() {
    const { casperName, expectations } = useCasperCustomContext();

    return (
        <div className="mt-[60px] flex flex-col items-center">
            <div className="flex items-center gap-[107px]">
                <div>
                    <CasperCardFront casperName={casperName} hasRandomButton={false} />

                    <div className="flex gap-500 h-body-1-bold text-n-white mt-[30px]">
                        <button className="py-[18px] rounded-[48px] border border-n-white flex-1 bg-n-white/[.24]">
                            이미지 저장
                        </button>
                        <button className="py-[18px] rounded-[48px] border border-n-white flex-1 bg-n-white/[.24]">
                            다시 만들기
                        </button>
                    </div>
                </div>

                <div>
                    <CTAButton label="이벤트 공유해서 추가 응모하기" />
                </div>
            </div>

            <button className="flex gap-300 mt-[60px] group">
                <p className="h-body-1-regular text-n-white group-hover:underline">
                    다른 사람들의 스마일 로봇 뱃지 보러가기
                </p>
                <ArrowIcon stroke="#ffffff" />
            </button>
        </div>
    );
}
