import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { PHONE_NUMBER_FORMAT, formatPhoneNumber } from "@/utils/formatPhoneNumber";
import CTAButton from "../CTAButton";
import CheckBox from "../CheckBox";
import Input from "../Input";

export interface PhoneNumberPopUpProps {
    phoneNumber: string;
    handlePhoneNumberChange: (val: string) => void;
    handlePhoneNumberConfirm: (val: string) => void;
    handleClose: () => void;
}

export default function PhoneNumberPopUp({
    phoneNumber = "",
    handlePhoneNumberChange,
    handlePhoneNumberConfirm,
    handleClose,
}: PhoneNumberPopUpProps) {
    const [isUserInfoCheck, setIsUserInfoCheck] = useState(true);
    const [isMarketingInfoCheck, setIsMarketingInfoCheck] = useState(true);
    const [canConfirm, setCanConfirm] = useState(false);

    useEffect(() => {
        const isPhoneNumberFormat = !!phoneNumber.match(PHONE_NUMBER_FORMAT);

        setCanConfirm(isUserInfoCheck && isMarketingInfoCheck && isPhoneNumberFormat);
    }, [isUserInfoCheck, isMarketingInfoCheck, phoneNumber]);

    const handleTextFieldChange = useCallback((val: string) => {
        if (val.length > 13) {
            return;
        }

        const formattedPhoneNumber = formatPhoneNumber(val);
        handlePhoneNumberChange(formattedPhoneNumber);
    }, []);

    const handleUserInfoCheckChange = useCallback((isChecked: boolean) => {
        setIsUserInfoCheck(isChecked);
    }, []);
    const handleMarketingCheckChange = useCallback((isChecked: boolean) => {
        setIsMarketingInfoCheck(isChecked);
    }, []);

    const errorMessage = useMemo(() => {
        if (phoneNumber.length >= 11 && !phoneNumber.match(PHONE_NUMBER_FORMAT)) {
            return "전화번호는 010으로 시작해야합니다!";
        }
        if (!isMarketingInfoCheck || !isUserInfoCheck) {
            return "필수 약관에 동의해주세요!";
        }
        return "";
    }, [phoneNumber, isUserInfoCheck, isMarketingInfoCheck]);

    const handleConfirm = (e: FormEvent) => {
        e.preventDefault();
        if (!errorMessage) {
            handlePhoneNumberConfirm(phoneNumber);
        }
    };

    return (
        <div className="fixed w-full h-full left-0 top-0 z-20">
            <div
                className="absolute left-0 top-0 w-[100%] h-[100%] bg-n-black/[.4]"
                onClick={handleClose}
            />
            <form
                className="px-[80px] py-[81px] bg-n-white rounded-800 absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]"
                onSubmit={handleConfirm}
            >
                <button className="absolute right-700 top-700" type="button" onClick={handleClose}>
                    <img alt="팝업 닫기 버튼" src="/assets/icons/close.svg" />
                </button>

                <div className="flex flex-col gap-400">
                    <h3 className="h-heading-3-bold text-n-neutral-950">
                        이벤트 당첨 시 본인을 확인할 수 있는
                        <br />
                        전화번호를 입력해주세요!
                    </h3>
                    <p className="h-body-2-regular text-n-neutral-950">
                        *당첨자에게는 입력한 번호로 경품 전달 예정입니다. 정확한 전화번호를 입력해
                        주세요.
                    </p>
                </div>

                <div className="pt-800" />

                <Input
                    type="light"
                    label="전화번호"
                    placeholder="010-xxxx-xxxx"
                    value={phoneNumber}
                    handleValueChange={handleTextFieldChange}
                />

                <div className="pt-200" />

                <p className="h-body-2-medium text-s-red pt-400">{errorMessage}</p>

                <div className="pt-500" />

                <div className="flex flex-col gap-500">
                    <div className="flex gap-500">
                        <CheckBox
                            label="개인정보 수집 및 활용 동의"
                            isChecked={isUserInfoCheck}
                            handleChangeCheck={handleUserInfoCheckChange}
                        />
                    </div>
                    <div className="flex gap-500">
                        <CheckBox
                            label="마케팅 정보 수신 동의"
                            isChecked={isMarketingInfoCheck}
                            handleChangeCheck={handleMarketingCheckChange}
                        />
                    </div>
                </div>

                <div className="pt-1000" />

                <div className="flex justify-center">
                    <CTAButton
                        disabled={canConfirm ? false : true}
                        color="blue"
                        label="다음"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
}
