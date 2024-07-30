import { ChangeEvent } from "react";
import { checkBoxContainerVariants, checkBoxVariants } from "./index.style";

export interface CheckBoxProps {
    label?: string;
    isChecked: boolean;
    handleChangeCheck: (val: boolean) => void;
}

export default function CheckBox({ label = "", isChecked, handleChangeCheck }: CheckBoxProps) {
    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        handleChangeCheck(e.target.checked);
    };

    return (
        <label className="cursor-pointer flex gap-500 items-center">
            <div className={checkBoxContainerVariants({ isChecked })}>
                <input
                    type="checkbox"
                    className="hidden"
                    checked={isChecked}
                    onChange={handleChangeInput}
                />
                <span className={checkBoxVariants({ isChecked })}></span>
                <img
                    alt="체크버튼 아이콘"
                    src="/assets/icons/check.svg"
                    className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                />
            </div>
            {label && <p className="text-n-neutral-500 h-body-2-regular">{label}</p>}
        </label>
    );
}
