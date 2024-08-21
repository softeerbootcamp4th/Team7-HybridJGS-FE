import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { RushAPI } from "@/apis/rushAPI.ts";
import { CARD_OPTION, CARD_PHASE } from "@/constants/Rush/rushCard.ts";
import { COOKIE_KEY } from "@/constants/cookie.ts";
import RushCard from "@/features/RushGame/RushGameComponents/RushCard.tsx";
import useFetch from "@/hooks/useFetch.ts";
import useFetchRushBalance from "@/hooks/useFetchRushBalance.ts";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import {
    GetRushUserParticipationStatusResponse,
    RushEventStatusCodeResponse,
} from "@/types/rushApi.ts";
import { CardOption } from "@/types/rushGame.ts";

export default function RushCardComparison() {
    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);
    const { gameState, setUserSelectedOption, setUserParticipationStatus } = useRushGameContext();
    const fetchRushBalance = useFetchRushBalance();

    const {
        data: postSelectedRushOptionResponse,
        isSuccess: isSuccessPostSelectedRushOption,
        fetchData: postSelectedRushOptionApply,
    } = useFetch<RushEventStatusCodeResponse, { token: string; optionId: CardOption }>(
        ({ token, optionId }) => RushAPI.postSelectedRushOptionApply(token, optionId)
    );

    const { data: userParticipatedStatus, fetchData: getRushUserParticipationStatus } = useFetch<
        GetRushUserParticipationStatusResponse,
        string
    >((token) => RushAPI.getRushUserParticipationStatus(token));

    const handleCardSelection = async (optionId: CardOption) => {
        await postSelectedRushOptionApply({ token: cookies[COOKIE_KEY.ACCESS_TOKEN], optionId });
        setUserSelectedOption(optionId);
    };

    useEffect(() => {
        if (isSuccessPostSelectedRushOption && postSelectedRushOptionResponse === 204) {
            getRushUserParticipationStatus(cookies[COOKIE_KEY.ACCESS_TOKEN]);
        }
    }, [isSuccessPostSelectedRushOption, postSelectedRushOptionResponse]);

    useEffect(() => {
        if (userParticipatedStatus !== null) {
            setUserParticipationStatus(userParticipatedStatus);
            if (userParticipatedStatus && CARD_PHASE.IN_PROGRESS) {
                fetchRushBalance();
            }
        }
    }, [userParticipatedStatus]);

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
