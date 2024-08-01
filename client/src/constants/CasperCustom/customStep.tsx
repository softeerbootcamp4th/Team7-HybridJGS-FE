import {
    ColorPanel,
    EyesPanel,
    MouthPanel,
    StickerPanel,
} from "@/features/CasperCustom/CasperCustomPanel";
import { CUSTOM_OPTION } from "./casper";

export const CUSTOM_STEP_OPTION = {
    PROCESS: "process",
    FORM: "form",
    FINISHING: "finishing",
    FINISH: "finish",
};
export const CUSTOM_STEP_OPTION_ARRAY = [
    CUSTOM_STEP_OPTION.PROCESS,
    CUSTOM_STEP_OPTION.FORM,
    CUSTOM_STEP_OPTION.FINISHING,
    CUSTOM_STEP_OPTION.FINISH,
];

export const CUSTOM_STEP_HEADLINE = {
    [CUSTOM_STEP_OPTION.PROCESS]: {
        title: "캐스퍼 일렉트릭 봇을 꾸며주세요!",
        description: "언제든지 이전으로 돌아와 선택사항을 바꿀 수 있으니 마음대로 꾸며주세요",
    },
    [CUSTOM_STEP_OPTION.FORM]: {
        title: "새롭게 출시될 캐스퍼 일렉트릭의 기대평을 작성하고 당첨 확률을 높여 보세요",
        description: (
            <>
                이름만 지어 주면 1회 응모, 기대평까지 작성하면 2회 응모예요
                <br />
                (최초 1회만 응모 가능해요)
            </>
        ),
    },
    [CUSTOM_STEP_OPTION.FINISH]: {
        title: "친구에게 이벤트를 공유하고 당첨 확률을 높이세요!",
        description: "*당첨 결과는 N월 N일에 발표할게요",
    },
};

export const CUSTOM_OPTION_ARRAY = [
    { id: CUSTOM_OPTION.EYES, label: "눈", component: <EyesPanel /> },
    { id: CUSTOM_OPTION.MOUTH, label: "입", component: <MouthPanel /> },
    { id: CUSTOM_OPTION.COLOR, label: "색상", component: <ColorPanel /> },
    { id: CUSTOM_OPTION.STICKER, label: "스티커", component: <StickerPanel /> },
];

export const MAX_APPLY = 10;
