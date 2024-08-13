import { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { useCookies } from "react-cookie";
import { RushAPI } from "@/apis/rushAPI.ts";
import Category from "@/components/Category";
import { COOKIE_TOKEN_KEY } from "@/constants/Auth/token.ts";
import { CARD_COLOR } from "@/constants/Rush/rushCard.ts";
import { GetRushOptionResultResponse } from "@/types/rushApi.ts";

const backgroundGradients = cva(
    `flex gap-[35px] w-[834px] h-[400px] bg-gradient-green rounded-800 py-6 px-[37px] justify-between break-keep`,
    {
        variants: {
            color: {
                [CARD_COLOR.BLUE]: "bg-gradient-blue",
                [CARD_COLOR.RED]: "bg-gradient-red",
                [CARD_COLOR.YELLOW]: "bg-gradient-yellow",
                [CARD_COLOR.GREEN]: "bg-gradient-green",
            },
        },
    }
);

export default function RushCardResultDescription() {
    const [userResultData, setUserResultData] = useState<GetRushOptionResultResponse>();
    const [cookies] = useCookies([COOKIE_TOKEN_KEY]);

    useEffect(() => {
        (async () => {
            // TODO: 사용자가 선택한 카드 옵션(1 or 2) Context에 저장해서 받기
            const userResultData = await RushAPI.getRushOptionResult(cookies[COOKIE_TOKEN_KEY], 1);
            setUserResultData(userResultData);
        })();
    }, []);

    const {
        mainText: mainText = "",
        resultMainText: resultMainText = "",
        resultSubText: resultSubText = "",
    } = userResultData || {};

    // TODO: RushCard에서 선택한 색상 가져오기
    const color = CARD_COLOR.RED;

    return (
        <div className={backgroundGradients({ color })}>
            <div className="flex flex-col gap-2 justify-center items-center w-[245px]">
                <Category type="limited">당신의 선택</Category>
                <h2 className="h-heading-2-bold text-center text-n-neutral-950 max-w-56">
                    {mainText}
                </h2>
                <span className="h-body-1-regular text-center text-s-red">
                    <p>지금 </p>
                    {/* TODO: 실시간 비율 Context로 저장해서 넣기 */}
                    <p className="h-body-1-bold">63%</p>
                    <p>가 선택했어요</p>
                </span>
            </div>
            <span className="flex flex-col justify-center items-center gap-3 w-[480px] h-[352px] rounded-800 bg-[url('/assets/main/car-2.jpg')] bg-no-repeat bg-center bg-cover text-n-white">
                <p className="text-center">CASPER Electric</p>
                <h2 className="h-heading-2-bold text-center max-w-80">{resultMainText}</h2>
                <p className="h-body-1-bold text-center max-w-72">{resultSubText}</p>
            </span>
        </div>
    );
}
