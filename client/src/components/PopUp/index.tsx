import { useEffect, useState } from "react";
import { PHONE_NUMBER_FORMAT, formatPhoneNumber } from "@/utils/formatPhoneNumber";
import CTAButton from "../CTAButton";
import CheckBox from "../CheckBox";
import Input from "../Input";

export interface PopUpProps {
    phoneNumber: string;
    handlePhoneNumberChange: (val: string) => void;
    handleClose: () => void;
    handleConfirm: () => void;
}

export default function PopUp({
    phoneNumber = "",
    handlePhoneNumberChange,
    handleClose,
    handleConfirm,
}: PopUpProps) {
    const [isUserInfoCheck, setIsUserInfoCheck] = useState(true);
    const [isMarketingInfoCheck, setIsMarketingInfoCheck] = useState(true);

    const [canConfirm, setCanConfirm] = useState(false);

    useEffect(() => {
        const isPhoneNumberFormat = !!phoneNumber.match(PHONE_NUMBER_FORMAT);

        setCanConfirm(isUserInfoCheck && isMarketingInfoCheck && isPhoneNumberFormat);
    }, [isUserInfoCheck, isMarketingInfoCheck, phoneNumber]);

    const handleTextFieldChange = (val: string) => {
        if (val.length > 13) {
            return;
        }

        const formattedPhoneNumber = formatPhoneNumber(val);
        handlePhoneNumberChange(formattedPhoneNumber);
    };

    const handleDimClick = () => {
        handleClose();
    };

    const handleCTAButtonClick = () => {
        if (canConfirm) {
            handleConfirm();
        }
    };

    return (
        <div
            className="fixed left-0 top-0 w-full h-full z-50 bg-n-black/[.4]"
            onClick={handleDimClick}
        >
            <div className="px-[80px] py-[81px] bg-n-white rounded-800 absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
                <button className="absolute right-700 top-700">
                    <img src="/assets/icon/close.svg" />
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

                <div className="pt-400" />

                <div className="flex flex-col gap-500">
                    <div className="flex gap-500">
                        <CheckBox
                            label="개인정보 수집 및 활용 동의"
                            isChecked={isUserInfoCheck}
                            handleChangeCheck={(isChecked) => setIsUserInfoCheck(isChecked)}
                        />
                    </div>
                    <div className="flex gap-500">
                        <CheckBox
                            label="마케팅 정보 수신 동의"
                            isChecked={isMarketingInfoCheck}
                            handleChangeCheck={(isChecked) => setIsMarketingInfoCheck(isChecked)}
                        />
                    </div>
                </div>

                <div className="pt-1000" />

                <div className="flex justify-center">
                    <CTAButton
                        disabled={canConfirm ? false : true}
                        color="blue"
                        label="다음"
                        hasIcon={false}
                        onClick={handleCTAButtonClick}
                    />
                </div>
            </div>
        </div>
    );
}
