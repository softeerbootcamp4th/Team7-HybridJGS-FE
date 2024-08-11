import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { LotteryAPI } from "@/apis/lotteryAPI";
import CTAButton from "@/components/CTAButton";
import TextField from "@/components/TextField";
import { COOKIE_TOKEN_KEY } from "@/constants/Auth/token";
import { CUSTOM_OPTION } from "@/constants/CasperCustom/casper";
import { DISSOLVE } from "@/constants/animation";
import useCasperCustomDispatchContext from "@/hooks/useCasperCustomDispatchContext";
import useCasperCustomStateContext from "@/hooks/useCasperCustomStateContext";
import useFetch from "@/hooks/useFetch";
import { CASPER_ACTION } from "@/types/casperCustom";
import { CasperInformationType, PostCasperResponse } from "@/types/lotteryApi";
import { SCROLL_MOTION } from "../../constants/animation";
import { MyCasperCardFront } from "./MyCasperCardFront";

interface CasperCustomFormProps {
    navigateNextStep: () => void;
}

export function CasperCustomForm({ navigateNextStep }: CasperCustomFormProps) {
    const [cookies] = useCookies([COOKIE_TOKEN_KEY]);

    const {
        data: casper,
        isSuccess: isSuccessPostCasper,
        fetchData: postCasper,
    } = useFetch<PostCasperResponse, { token: string; casper: CasperInformationType }>(
        ({ token, casper }) => LotteryAPI.postCasper(token, casper)
    );

    const { casperName, expectations, selectedCasperIdx } = useCasperCustomStateContext();
    const dispatch = useCasperCustomDispatchContext();

    const canSubmit = casperName.length !== 0;

    useEffect(() => {
        if (casper && isSuccessPostCasper) {
            /**
             * 서버 상태 동기화
             */
            const { name, expectation, ...selectedOption } = casper;
            const option = {
                [CUSTOM_OPTION.EYES]: selectedOption.eyeShape,
                [CUSTOM_OPTION.EYES_DIRECTION]: selectedOption.eyePosition,
                [CUSTOM_OPTION.MOUTH]: selectedOption.mouthShape,
                [CUSTOM_OPTION.COLOR]: selectedOption.color,
                [CUSTOM_OPTION.STICKER]: selectedOption.sticker,
            };
            dispatch({
                type: CASPER_ACTION.SET_CASPER,
                payload: {
                    option,
                    casperName: name,
                    expectations: expectation,
                },
            });

            navigateNextStep();
        }
    }, [casper, isSuccessPostCasper]);

    const handleSetCasperName = useCallback((value: string) => {
        dispatch({ type: CASPER_ACTION.SET_CASPER_NAME, payload: value });
    }, []);

    const handleSetExpectations = useCallback((value: string) => {
        dispatch({ type: CASPER_ACTION.SET_EXPECTATIONS, payload: value });
    }, []);

    const handleSubmitCasper = async () => {
        const casper: CasperInformationType = {
            eyeShape: selectedCasperIdx[CUSTOM_OPTION.EYES],
            eyePosition: selectedCasperIdx[CUSTOM_OPTION.EYES_DIRECTION],
            mouthShape: selectedCasperIdx[CUSTOM_OPTION.MOUTH],
            color: selectedCasperIdx[CUSTOM_OPTION.COLOR],
            sticker: selectedCasperIdx[CUSTOM_OPTION.STICKER] || 0,
            name: casperName,
            expectation: expectations,
        };

        await postCasper({ token: cookies[COOKIE_TOKEN_KEY], casper });
    };

    return (
        <motion.div className="flex flex-col items-center" {...SCROLL_MOTION(DISSOLVE)}>
            <div className="flex items-center mt-[68px] gap-1000">
                <MyCasperCardFront hasRandomButton={false} />
                <div>
                    <TextField
                        label="캐스퍼 일렉트릭 봇의 이름을 지어주세요!"
                        isRequired
                        size="sm"
                        placeholder="김캐스퍼"
                        limit={10}
                        value={casperName}
                        handleValueChange={handleSetCasperName}
                    />
                    <div className="mt-[42px]" />
                    <TextField
                        label="캐스퍼 일렉트릭과 함께 하고 싶은 일이 있나요?"
                        isRequired={false}
                        size="lg"
                        placeholder="캐스퍼와 함께 혼자 차박하고 싶어요!"
                        limit={60}
                        value={expectations}
                        handleValueChange={handleSetExpectations}
                    />
                </div>
            </div>

            <div className="mt-1000">
                <CTAButton label="완료" disabled={!canSubmit} onClick={handleSubmitCasper} />
            </div>
        </motion.div>
    );
}
