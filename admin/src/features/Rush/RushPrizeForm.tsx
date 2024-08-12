import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import SelectForm from "@/components/SelectForm";
import TabHeader from "@/components/TabHeader";
import TextField from "@/components/TextField";
import useRushEventDispatchContext from "@/hooks/useRushEventDispatchContext";
import useRushEventStateContext from "@/hooks/useRushEventStateContext";
import { RUSH_ACTION, RushPrizeType } from "@/types/rush";

export default function RushPrizeForm() {
    const location = useLocation();
    const navigate = useNavigate();

    const rushIdx = location.state.idx;

    const { rushList } = useRushEventStateContext();
    const dispatch = useRushEventDispatchContext();

    const [prizeState, setPrizeState] = useState<RushPrizeType>({} as RushPrizeType);

    useEffect(() => {
        if (rushIdx !== undefined) {
            setPrizeState({
                prizeImageUrl: rushList[rushIdx].prizeImageUrl,
                prizeDescription: rushList[rushIdx].prizeDescription,
            });
        }
    }, [rushList]);

    const handleUpdate = () => {
        const updatedTableItemList = rushList.map((item, idx) => {
            if (idx === rushIdx) {
                return { ...item, ...prizeState };
            }
            return { ...item };
        });

        dispatch({
            type: RUSH_ACTION.SET_EVENT_LIST,
            payload: updatedTableItemList,
        });
    };

    const option = [
        ["이미지", <input type="file" />],
        [
            "경품 이름 (20자 이내)",
            <TextField
                value={prizeState.prizeDescription}
                onChange={(e) => setPrizeState({ ...prizeState, prizeDescription: e.target.value })}
            />,
        ],
    ];

    return (
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

            <Button buttonSize="lg" onClick={handleUpdate}>
                임시 저장
            </Button>
        </div>
    );
}
