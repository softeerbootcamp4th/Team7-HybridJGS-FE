import { ChangeEvent } from "react";
import { cva } from "class-variance-authority";

export interface CheckBoxProps {
    isChecked: boolean;
    handleChangeCheck: (val: boolean) => void;
}

const checkBoxVariants = cva(`absolute w-6 h-6 left-0 top-0 rounded-200`, {
    variants: {
        isChecked: {
            true: `bg-s-blue`,
            false: `bg-n-gray-500`,
        },
    },
});

export default function CheckBox({ isChecked, handleChangeCheck }: CheckBoxProps) {
    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        handleChangeCheck(e.target.checked);
    };

    return (
        <div className="relative w-6 h-6 rounded-200 hover:shadow-s-blue">
            <label className="cursor-pointer">
                <input
                    type="checkbox"
                    className="hidden"
                    checked={isChecked}
                    onChange={handleChangeInput}
                />
                <span className={checkBoxVariants({ isChecked })}></span>
                <img
                    alt="체크버튼 아이콘"
                    src="/assets/icon/check.svg"
                    className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                />
            </label>
        </div>
    );
}
