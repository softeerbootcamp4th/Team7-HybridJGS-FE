import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectForm from "@/components/SelectForm";
import TabHeader from "@/components/TabHeader";
import TextField from "@/components/TextField";
import useRushEventDispatchContext from "@/hooks/useRushEventDispatchContext";
import useRushEventStateContext from "@/hooks/useRushEventStateContext";
import { RUSH_ACTION } from "@/types/rush";

export default function RushSelectForm() {
    const navigate = useNavigate();

    const { selectOptions } = useRushEventStateContext();
    const dispatch = useRushEventDispatchContext();

    useEffect(() => {
        dispatch({
            type: RUSH_ACTION.SET_OPTION,
            payload: [
                {
                    rushOptionId: 1,
                    mainText: "첫 차로 저렴한 차 사기",
                    subText: "첫 차는 가성비가 짱이지!",
                    resultMainText: "누구보다 가성비 갑인 캐스퍼 일렉트릭",
                    resultSubText: "전기차 평균보다 훨씬 저렴한 캐스퍼 일렉트릭!",
                    imageUrl: "left_image.png",
                },
                {
                    rushOptionId: 2,
                    mainText: "첫 차로 성능 좋은 차 사기",
                    subText: "차는 당연히 성능이지!",
                    resultMainText: "필요한 건 다 갖춘 캐스퍼 일렉트릭",
                    resultSubText: "전기차 평균보다 훨씨니 저렴한 캐스퍼 일렉트릭!",
                    imageUrl: "left_image.png",
                },
            ],
        });
    }, []);

    const handleChangeItem = (key: string, changeIdx: number, text: string) => {
        const updatedItem = selectOptions.map((item, idx) => {
            if (idx === changeIdx) {
                return { ...item, [key]: text };
            }
            return { ...item };
        });

        dispatch({ type: RUSH_ACTION.SET_OPTION, payload: updatedItem });
    };

    const getSelectOption = (idx: number) => {
        if (selectOptions.length >= 2) {
            return [
                [
                    "메인 문구 (15자 이내)",
                    <TextField
                        value={selectOptions[idx].mainText}
                        onChange={(e) => handleChangeItem("mainText", idx, e.target.value)}
                    />,
                ],
                [
                    "서브 문구 (40자 이내)",
                    <TextField
                        value={selectOptions[idx].subText}
                        onChange={(e) => handleChangeItem("subText", idx, e.target.value)}
                    />,
                ],
            ];
        }
        return [];
    };
    const getSelectOptionResult = (idx: number) => {
        if (selectOptions.length >= 2) {
            return [
                ["이미지", <input type="file" />],
                [
                    "메인 문구 (20자 이내)",
                    <TextField
                        value={selectOptions[idx].resultMainText}
                        onChange={(e) => handleChangeItem("resultMainText", idx, e.target.value)}
                    />,
                ],
                [
                    "서브 문구 (45자 이내)",
                    <TextField
                        value={selectOptions[idx].resultSubText}
                        onChange={(e) => handleChangeItem("resultSubText", idx, e.target.value)}
                    />,
                ],
            ];
        }
        return [];
    };

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
                    <p className="h-body-1-medium">밸런스 게임 선택지 관리</p>
                </div>

                <div className="flex gap-10">
                    <div className="flex flex-col gap-4">
                        <SelectForm header="옵션 1 선택지" data={getSelectOption(0)} />
                        <SelectForm
                            header="옵션 1 선택 결과 정보"
                            data={getSelectOptionResult(0)}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <SelectForm header="옵션 2 선택지" data={getSelectOption(1)} />
                        <SelectForm
                            header="옵션 2 선택 결과 정보"
                            data={getSelectOptionResult(1)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
