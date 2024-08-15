import { useEffect } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { useLoaderData } from "react-router-dom";
import { LinkAPI } from "@/apis/linkAPI";
import CTAButton from "@/components/CTAButton";
import { CUSTOM_OPTION } from "@/constants/CasperCustom/casper";
import { CASPER_SHOWCASE_SECTIONS } from "@/constants/PageSections/sections";
import { ASCEND, DISSOLVE, SCROLL_MOTION } from "@/constants/animation";
import { COOKIE_KEY } from "@/constants/cookie";
import { CasperCards } from "@/features/CasperShowCase";
import useFetch from "@/hooks/useFetch";
import useHeaderStyleObserver from "@/hooks/useHeaderStyleObserver";
import useToast from "@/hooks/useToast";
import { GetShareLinkResponse } from "@/types/linkApi";
import { GetCasperListResponse } from "@/types/lotteryApi";
import { writeClipboard } from "@/utils/writeClipboard";

function getCardListData(cardList: GetCasperListResponse) {
    return cardList.map((card) => {
        return {
            id: card.casperId,
            casperName: card.name,
            expectations: card.expectation,
            selectedCasperIdx: {
                [CUSTOM_OPTION.EYES]: card.eyeShape,
                [CUSTOM_OPTION.EYES_DIRECTION]: card.eyePosition,
                [CUSTOM_OPTION.MOUTH]: card.mouthShape,
                [CUSTOM_OPTION.COLOR]: card.color,
                [CUSTOM_OPTION.STICKER]: card.sticker,
            },
        };
    });
}

export default function CasperShowCase() {
    const containerRef = useHeaderStyleObserver({
        darkSections: [CASPER_SHOWCASE_SECTIONS.SHOWCASE],
    });

    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);
    const { showToast, ToastComponent } = useToast("링크가 복사되었어요!");

    const {
        data: shareLink,
        isSuccess: isSuccessGetShareLink,
        fetchData: getShareLink,
    } = useFetch<GetShareLinkResponse>(() =>
        LinkAPI.getShareLink(cookies[COOKIE_KEY.ACCESS_TOKEN])
    );

    const casperList = useLoaderData() as GetCasperListResponse;
    const cardListData = getCardListData(casperList);

    useEffect(() => {
        if (shareLink && isSuccessGetShareLink) {
            writeClipboard(shareLink.shortenUrl, showToast);
        }
    }, [shareLink, isSuccessGetShareLink]);

    const handleClickShareButton = () => {
        getShareLink();
    };

    return (
        <div ref={containerRef}>
            <section
                id={CASPER_SHOWCASE_SECTIONS.SHOWCASE}
                className="flex flex-col justify-center items-center gap-800 w-full h-screen bg-n-neutral-950 overflow-hidden pt-1000"
            >
                <motion.div
                    className="flex flex-col justify-center items-center gap-800 w-full"
                    {...SCROLL_MOTION(DISSOLVE)}
                >
                    <p className="h-body-1-regular text-n-white">
                        카드 위에 커서를 올리면 기대평을 볼 수 있어요
                    </p>

                    <CasperCards cardList={cardListData} />
                </motion.div>

                <motion.div className="flex gap-500" {...SCROLL_MOTION(ASCEND)}>
                    <CTAButton label="이벤트 링크 공유" onClick={handleClickShareButton} />
                    <CTAButton label="메인으로 돌아가기" url="/" color="white" />
                </motion.div>
            </section>

            {ToastComponent}
        </div>
    );
}
