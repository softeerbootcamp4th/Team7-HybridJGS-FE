import CTAButton from "@/components/CTAButton";
import TextField from "@/components/TextField";
import useCasperCustomDispatchContext from "@/hooks/useCasperCustomDispatchContext";
import useCasperCustomStateContext from "@/hooks/useCasperCustomStateContext";
import { CASPER_ACTION } from "@/types/casperCustom";
import MyCasperCardFront from "./MyCasperCardFront";

interface CasperCustomFormProps {
    handleSubmitCustomCasper: () => void;
}

export default function CasperCustomForm({ handleSubmitCustomCasper }: CasperCustomFormProps) {
    const { casperName, expectations } = useCasperCustomStateContext();
    const dispatch = useCasperCustomDispatchContext();

    const canSubmit = casperName.length !== 0;

    const handleSetCasperName = (value: string) => {
        dispatch({ type: CASPER_ACTION.SET_CASPER_NAME, payload: value });
    };

    const handleSetExpectations = (value: string) => {
        dispatch({ type: CASPER_ACTION.SET_EXPECTATIONS, payload: value });
    };

    return (
        <>
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
                <CTAButton label="완료" disabled={!canSubmit} onClick={handleSubmitCustomCasper} />
            </div>
        </>
    );
}
