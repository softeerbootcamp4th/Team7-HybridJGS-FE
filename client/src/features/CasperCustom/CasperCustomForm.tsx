import CTAButton from "@/components/CTAButton";
import TextField from "@/components/TextField";
import useCasperCustomContext from "@/hooks/useCasperCustomContext";
import CasperCardFront from "./CasperCardFront";

interface CasperCustomFormProps {
    handleSubmitCustomCasper: () => void;
}

export default function CasperCustomForm({ handleSubmitCustomCasper }: CasperCustomFormProps) {
    const { casperName, setCasperName, expectations, setExpectations } = useCasperCustomContext();

    const canSubmit = casperName.length !== 0;

    return (
        <>
            <div className="flex items-center mt-[68px] gap-1000">
                <CasperCardFront hasRandomButton={false} />
                <div>
                    <TextField
                        label="캐스퍼 일렉트릭 봇의 이름을 지어주세요!"
                        isRequired
                        size="sm"
                        placeholder="김캐스퍼"
                        limit={10}
                        value={casperName}
                        handleValueChange={(val) => setCasperName(val)}
                    />
                    <div className="mt-[42px]" />
                    <TextField
                        label="캐스퍼 일렉트릭과 함께 하고 싶은 일이 있나요?"
                        isRequired={false}
                        size="lg"
                        placeholder="캐스퍼와 함께 혼자 차박하고 싶어요!"
                        limit={60}
                        value={expectations}
                        handleValueChange={(val) => setExpectations(val)}
                    />
                </div>
            </div>

            <div className="mt-1000">
                <CTAButton label="완료" disabled={!canSubmit} onClick={handleSubmitCustomCasper} />
            </div>
        </>
    );
}
