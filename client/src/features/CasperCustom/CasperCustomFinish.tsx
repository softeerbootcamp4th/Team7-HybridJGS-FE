import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { LinkAPI } from "@/apis/linkAPI";
import { LotteryAPI } from "@/apis/lotteryAPI";
import CTAButton from "@/components/CTAButton";
import { MAX_APPLY } from "@/constants/CasperCustom/customStep";
import { DISSOLVE } from "@/constants/animation";
import { COOKIE_KEY } from "@/constants/cookie";
import useCasperCustomDispatchContext from "@/hooks/useCasperCustomDispatchContext";
import useCasperCustomStateContext from "@/hooks/useCasperCustomStateContext";
import useFetch from "@/hooks/useFetch";
import useToast from "@/hooks/useToast";
import { CASPER_ACTION } from "@/types/casperCustom";
import { GetShareLinkResponse } from "@/types/linkApi";
import { GetApplyCountResponse } from "@/types/lotteryApi";
import { saveDomImage } from "@/utils/saveDomImage";
import { writeClipboard } from "@/utils/writeClipboard";
import { SCROLL_MOTION } from "../../constants/animation";
import { Battery } from "./Battery";
import { MyCasperCardFront } from "./MyCasperCardFront";
import ArrowIcon from "/public/assets/icons/arrow.svg?react";

interface CasperCustomFinishProps {
    handleResetStep: () => void;
    unblockNavigation: () => void;
}

export function CasperCustomFinish({
    handleResetStep,
    unblockNavigation,
}: CasperCustomFinishProps) {
    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);

    const { data: applyCountData, fetchData: getApplyCount } = useFetch<GetApplyCountResponse>(() =>
        LotteryAPI.getApplyCount(cookies[COOKIE_KEY.ACCESS_TOKEN])
    );

    const {
        data: shareLink,
        isSuccess: isSuccessGetShareLink,
        isError: isErrorGetShareLink,
        fetchData: getShareLink,
    } = useFetch<GetShareLinkResponse>(
        () => LinkAPI.getShareLink(cookies[COOKIE_KEY.ACCESS_TOKEN]),
        false
    );

    const { showToast, ToastComponent } = useToast(
        isErrorGetShareLink
            ? "공유 링크 생성에 실패했습니다! 캐스퍼 봇 생성 후 다시 시도해주세요."
            : "링크가 복사되었어요!"
    );

    const dispatch = useCasperCustomDispatchContext();
    const { casperName } = useCasperCustomStateContext();

    const casperCustomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (shareLink && isSuccessGetShareLink) {
            writeClipboard(shareLink.shortenUrl, showToast);
            return;
        }
        if (isErrorGetShareLink) {
            showToast();
        }
    }, [shareLink, isSuccessGetShareLink]);
    useEffect(() => {
        if (!cookies[COOKIE_KEY.ACCESS_TOKEN]) {
            return;
        }

        unblockNavigation();
        getApplyCount();
    }, [cookies]);

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

    const handleClickShareButton = () => {
        getShareLink();
    };

    return (
        <motion.div className="mt-[60px] flex flex-col items-center" {...SCROLL_MOTION(DISSOLVE)}>
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
                    {applyCountData && (
                        <div className="flex flex-col items-center gap-800">
                            <p className="text-n-neutral-500">응모한 횟수</p>

                            <Battery applyCount={applyCountData.appliedCount} />

                            <div className="flex items-center gap-300">
                                <h2 className="h-heading-2-bold text-n-white">
                                    {applyCountData.appliedCount}회
                                </h2>{" "}
                                <p className="h-body-2-regular text-n-neutral-300">
                                    /{MAX_APPLY}회
                                </p>
                            </div>
                        </div>
                    )}

                    <CTAButton
                        label="이벤트 공유해서 추가 응모하기"
                        onClick={handleClickShareButton}
                    />
                </div>
            </div>

            <Link className="flex gap-300 mt-[60px] group" to="/lottery/show-case">
                <p className="h-body-1-regular text-n-white group-hover:underline">
                    다른 사람들의 스마일 로봇 뱃지 보러가기
                </p>
                <ArrowIcon stroke="#ffffff" />
            </Link>

            {ToastComponent}
        </motion.div>
    );
}
