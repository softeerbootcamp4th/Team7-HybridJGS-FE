import { useEffect } from "react";
import { cva } from "class-variance-authority";
import { useCookies } from "react-cookie";
import { RushAPI } from "@/apis/rushAPI.ts";
import Category from "@/components/Category";
import { CARD_COLOR } from "@/constants/Rush/rushCard.ts";
import { COOKIE_KEY } from "@/constants/cookie.ts";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";

const backgroundGradients = cva(
    `flex gap-[35px] w-[834px] h-[400px] rounded-800 py-6 px-[37px] justify-between break-keep`,
    {
        variants: {
            color: {
                [CARD_COLOR.BLUE]: "bg-gradient-blue",
                [CARD_COLOR.RED]: "bg-gradient-red",
                [CARD_COLOR.YELLOW]: "bg-gradient-yellow",
                [CARD_COLOR.GREEN]: "bg-gradient-green",
            },
            defaultVariants: {
                color: CARD_COLOR.GREEN,
            },
        },
    }
);

export default function RushCardResultDescription() {
    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);
    const { gameState, updateCardOptions, getSelectedCardInfo, getOptionRatio } =
        useRushGameContext();

    useEffect(() => {
        (async () => {
            const userResultData = await RushAPI.getRushOptionResult(
                cookies[COOKIE_KEY.ACCESS_TOKEN],
                gameState.userSelectedOption
            );
            if (userResultData) {
                updateCardOptions(gameState.userSelectedOption, {
                    mainText: userResultData.mainText,
                    resultMainText: userResultData.resultMainText,
                    resultSubText: userResultData.resultSubText,
                });
            }
        })();
    }, []);

    const { mainText, resultMainText, resultSubText, color } = getSelectedCardInfo(
        gameState.userSelectedOption
    );

    const selectedOptionRatio = getOptionRatio(gameState.userSelectedOption);

    return (
        <div className={backgroundGradients({ color })}>
            <div className="flex flex-col gap-2 justify-center items-center w-[245px]">
                <Category type="limited">당신의 선택</Category>
                <h2 className="h-heading-2-bold text-center text-n-neutral-950 max-w-56">
                    {mainText}
                </h2>
                <span className="h-body-1-regular text-center text-s-red">
                    <p>지금 </p>
                    <p className="h-body-1-bold">{selectedOptionRatio}%</p>
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
