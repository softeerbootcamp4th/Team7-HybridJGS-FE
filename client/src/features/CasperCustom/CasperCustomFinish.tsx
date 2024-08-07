import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { LotteryAPI } from "@/apis/lotteryAPI";
import CTAButton from "@/components/CTAButton";
import { COOKIE_TOKEN_KEY } from "@/constants/Auth/token";
import { MAX_APPLY } from "@/constants/CasperCustom/customStep";
import { DISSOLVE } from "@/constants/animation";
import useCasperCustomDispatchContext from "@/hooks/useCasperCustomDispatchContext";
import useCasperCustomStateContext from "@/hooks/useCasperCustomStateContext";
import { CASPER_ACTION } from "@/types/casperCustom";
import { saveDomImage } from "@/utils/saveDomImage";
import { Battery } from "./Battery";
import { MyCasperCardFront } from "./MyCasperCardFront";
import ArrowIcon from "/public/assets/icons/arrow.svg?react";

interface CasperCustomFinishProps {
    handleResetStep: () => void;
}

export function CasperCustomFinish({ handleResetStep }: CasperCustomFinishProps) {
    const [cookies] = useCookies([COOKIE_TOKEN_KEY]);

    const dispatch = useCasperCustomDispatchContext();
    const { casperName, selectedCasperIdx } = useCasperCustomStateContext();

    const casperCustomRef = useRef<HTMLDivElement>(null);

    const [applyCount, setApplyCount] = useState<number>(0);

    useEffect(() => {
        if (!cookies.token) {
            return;
        }
        getApplyCount();
    }, []);

    const getApplyCount = async () => {
        const data = await LotteryAPI.getApplyCount(cookies.token);
        setApplyCount(data.appliedCount);
    };

    const handleSaveImage = () => {
        if (!casperCustomRef.current) {
            return;
        }

        saveDomImage({ casperName, casperCustomDom: casperCustomRef.current });
    };

    const handleReset = () => {
        handleResetStep();
        dispatch({ type: CASPER_ACTION.RESET_CUSTOM });
    };

    return (
        <motion.div className="mt-[60px] flex flex-col items-center" {...DISSOLVE}>
            <div className="flex items-center gap-[107px]">
                <div>
                    <div ref={casperCustomRef}>
                        <MyCasperCardFront casperName={casperName} hasRandomButton={false} />
                    </div>

                    <div className="flex gap-500 h-body-1-bold text-n-white mt-[30px]">
                        <button
                            className="py-[18px] rounded-[48px] border border-n-white flex-1 bg-n-white/[.24]"
                            onClick={handleSaveImage}
                        >
                            이미지 저장
                        </button>
                        <button
                            className="py-[18px] rounded-[48px] border border-n-white flex-1 bg-n-white/[.24]"
                            onClick={handleReset}
                        >
                            다시 만들기
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-[56px]">
                    <div className="flex flex-col items-center gap-800">
                        <p className="text-n-neutral-500">응모한 횟수</p>

                        <Battery applyCount={applyCount} />

                        <div className="flex items-center gap-300">
                            <h2 className="h-heading-2-bold text-n-white">{applyCount}회</h2>{" "}
                            <p className="h-body-2-regular text-n-neutral-300">/{MAX_APPLY}회</p>
                        </div>
                    </div>

                    <CTAButton label="이벤트 공유해서 추가 응모하기" />
                </div>
            </div>

            <Link className="flex gap-300 mt-[60px] group" to="/lottery/show-case">
                <p className="h-body-1-regular text-n-white group-hover:underline">
                    다른 사람들의 스마일 로봇 뱃지 보러가기
                </p>
                <ArrowIcon stroke="#ffffff" />
            </Link>
        </motion.div>
    );
}
