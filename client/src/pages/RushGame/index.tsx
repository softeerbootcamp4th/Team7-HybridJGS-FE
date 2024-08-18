import { useEffect } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { LinkAPI } from "@/apis/linkAPI.ts";
import CTAButton from "@/components/CTAButton";
import { CARD_PHASE } from "@/constants/Rush/rushCard.ts";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { COOKIE_KEY } from "@/constants/cookie.ts";
import CardOptions from "@/features/RushGame/RushGameSections/CardOptions.tsx";
import Countdown from "@/features/RushGame/RushGameSections/Countdown.tsx";
import FinalResult from "@/features/RushGame/RushGameSections/FinalResult.tsx";
import SelectedCard from "@/features/RushGame/RushGameSections/SelectedCard.tsx";
import useFetch from "@/hooks/useFetch.ts";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import useToast from "@/hooks/useToast.tsx";
import { GetShareLinkResponse } from "@/types/linkApi.ts";
import { writeClipboard } from "@/utils/writeClipboard.ts";

// TODO: 계속 카운트 다운에 맞춰 매초 렌더링 되는 문제 해결
export default function RushGame() {
    const { gameState } = useRushGameContext();
    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);

    // TODO: 선착순 페이지로 리다이렉트 되도록 변경
    // TODO: 공유 링크 연동 부분 공통 로직 분리
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
            ? "공유 링크 생성에 실패했습니다! 다시 시도해주세요."
            : "링크가 복사되었어요!"
    );

    useEffect(() => {
        if (shareLink && isSuccessGetShareLink) {
            writeClipboard(shareLink.shortenUrl, showToast);
            return;
        }
        if (isErrorGetShareLink) {
            showToast();
        }
    }, [shareLink, isSuccessGetShareLink, isErrorGetShareLink]);

    const handleClickShareButton = () => {
        getShareLink();
    };

    const renderRushGameContent = () => {
        switch (gameState.phase) {
            case CARD_PHASE.NOT_STARTED:
                return <Countdown />;
            case CARD_PHASE.IN_PROGRESS:
                if (!gameState.userParticipatedStatus) {
                    return <CardOptions />;
                } else {
                    return <SelectedCard />;
                }
            case CARD_PHASE.COMPLETED:
                return <FinalResult />;
            default:
                return null;
        }
    };

    return (
        <section className="h-screen bg-n-white flex flex-col gap-8 justify-center items-center">
            {renderRushGameContent()}
            <motion.div
                className="flex flex-col justify-center items-center gap-4 my-3"
                {...SCROLL_MOTION(ASCEND)}
            >
                <p className="h-body-2-regular text-n-neutral-500">
                    우리 편에 투표할 친구를 불러오세요!
                </p>
                <CTAButton label="이벤트 링크 공유" onClick={handleClickShareButton} />
            </motion.div>

            {ToastComponent}
        </section>
    );
}
