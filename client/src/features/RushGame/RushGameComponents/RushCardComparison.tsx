import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { RushAPI } from "@/apis/rushAPI.ts";
import { CARD_OPTION } from "@/constants/Rush/rushCard.ts";
import { COOKIE_KEY } from "@/constants/cookie.ts";
import RushCard from "@/features/RushGame/RushGameComponents/RushCard.tsx";
import useRushGameDispatchContext from "@/hooks/Contexts/useRushGameDispatchContext.ts";
import useRushGameStateContext from "@/hooks/Contexts/useRushGameStateContext.ts";
import { useFetchRushUserParticipationStatus } from "@/hooks/RushGame/useFetchRushUserParticipationStatus.ts";
import useFetch from "@/hooks/useFetch.ts";
import { RushEventStatusCodeResponse } from "@/types/rushApi.ts";
import { CardOption, RUSH_ACTION } from "@/types/rushGame.ts";

export default function RushCardComparison() {
    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);
    const gameState = useRushGameStateContext();
    const dispatch = useRushGameDispatchContext();
    const { getRushUserParticipationStatus } = useFetchRushUserParticipationStatus();

    const {
        data: postSelectedRushOptionResponse,
        isSuccess: isSuccessPostSelectedRushOption,
        fetchData: postSelectedRushOptionApply,
    } = useFetch<RushEventStatusCodeResponse, { token: string; optionId: CardOption }>(
        ({ token, optionId }) => RushAPI.postSelectedRushOptionApply(token, optionId)
    );

    const handleCardSelection = async (optionId: CardOption) => {
        await postSelectedRushOptionApply({ token: cookies[COOKIE_KEY.ACCESS_TOKEN], optionId });
        dispatch({ type: RUSH_ACTION.SET_USER_OPTION, payload: optionId });
    };

    useEffect(() => {
        if (isSuccessPostSelectedRushOption && postSelectedRushOptionResponse === 204) {
            getRushUserParticipationStatus(cookies[COOKIE_KEY.ACCESS_TOKEN]);
        }
    }, [isSuccessPostSelectedRushOption, postSelectedRushOptionResponse]);

    const leftOptionData = gameState.cardOptions[CARD_OPTION.LEFT_OPTIONS];
    const rightOptionData = gameState.cardOptions[CARD_OPTION.RIGHT_OPTIONS];

    return (
        <div className="flex gap-10 justify-center items-center">
            <RushCard
                color={leftOptionData.color}
                mainText={leftOptionData.mainText}
                subText={leftOptionData.subText}
                onClick={() => handleCardSelection(CARD_OPTION.LEFT_OPTIONS)}
            />
            <p className="h-heading-2-bold text-n-neutral-500 bg-n-neutral-50 rounded-800 w-[90px] h-[78px] flex justify-center items-center">
                VS
            </p>
            <RushCard
                color={rightOptionData.color}
                mainText={rightOptionData.mainText}
                subText={rightOptionData.subText}
                onClick={() => handleCardSelection(CARD_OPTION.RIGHT_OPTIONS)}
            />
        </div>
    );
}
