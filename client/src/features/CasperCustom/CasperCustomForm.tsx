import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import TextField from "@/components/TextField";
import { CUSTOM_OPTION } from "@/constants/CasperCustom/casper";
import { DISSOLVE } from "@/constants/animation";
import useCasperCustomDispatchContext from "@/hooks/useCasperCustomDispatchContext";
import useCasperCustomStateContext from "@/hooks/useCasperCustomStateContext";
import { CASPER_ACTION } from "@/types/casperCustom";
import { CasperInformationType } from "@/types/lotteryApi";
import { MyCasperCardFront } from "./MyCasperCardFront";

interface CasperCustomFormProps {
    handleSubmitCustomCasper: (casper: CasperInformationType) => void;
}

export function CasperCustomForm({ handleSubmitCustomCasper }: CasperCustomFormProps) {
    const { casperName, expectations, selectedCasperIdx } = useCasperCustomStateContext();
    const dispatch = useCasperCustomDispatchContext();

    const canSubmit = casperName.length !== 0;

    const handleSetCasperName = (value: string) => {
        dispatch({ type: CASPER_ACTION.SET_CASPER_NAME, payload: value });
    };

    const handleSetExpectations = (value: string) => {
        dispatch({ type: CASPER_ACTION.SET_EXPECTATIONS, payload: value });
    };

    const handleSubmitCasper = () => {
        const casper: CasperInformationType = {
            eyeShape: selectedCasperIdx[CUSTOM_OPTION.EYES],
            eyePosition: selectedCasperIdx[CUSTOM_OPTION.EYES_DIRECTION],
            mouthShape: selectedCasperIdx[CUSTOM_OPTION.MOUTH],
            color: selectedCasperIdx[CUSTOM_OPTION.COLOR],
            sticker: selectedCasperIdx[CUSTOM_OPTION.STICKER] || 0,
            name: casperName,
            expectation: expectations,
        };
        handleSubmitCustomCasper(casper);
    };

    return (
        <motion.div className="flex flex-col items-center" {...DISSOLVE}>
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
