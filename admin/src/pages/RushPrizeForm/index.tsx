import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectForm from "@/components/SelectForm";
import TabHeader from "@/components/TabHeader";
import TextField from "@/components/TextField";
import useRushEventDispatchContext from "@/hooks/useRushEventDispatchContext";
import useRushEventStateContext from "@/hooks/useRushEventStateContext";
import { RUSH_ACTION } from "@/types/rush";

export default function RushPrizeForm() {
    const navigate = useNavigate();

    const { prize } = useRushEventStateContext();
    const dispatch = useRushEventDispatchContext();

    useEffect(() => {
        dispatch({
            type: RUSH_ACTION.SET_PRIZE,
            payload: {
                prizeImageUrl: "prize.png",
                prizeDescription: "메가박스 영화 예매권",
            },
        });
    }, []);

    const option = [
        ["이미지", <input type="file" />],
        [
            "경품 이름 (20자 이내)",
            <TextField
                value={prize.prizeDescription}
                onChange={(e) =>
                    dispatch({
                        type: RUSH_ACTION.SET_PRIZE,
                        payload: { ...prize, prizeDescription: e.target.value },
                    })
                }
            />,
        ],
    ];

    return (
        <div className="flex flex-col items-center h-screen">
            <TabHeader />

            <div className="w-[1560px] flex flex-col items-center justify-center gap-8 mt-10">
                <div className="flex items-center gap-2 self-start">
                    <img
                        alt="뒤로 가기 버튼"
                        src="/assets/icons/left-arrow.svg"
                        className="cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <p className="h-body-1-medium">밸런스 게임 경품 관리</p>
                </div>

                <SelectForm header="경품 관리" data={option} />
            </div>
        </div>
    );
}
