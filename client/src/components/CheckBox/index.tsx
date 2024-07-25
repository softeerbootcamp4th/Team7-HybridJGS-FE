import { ChangeEvent } from "react";
import { cva } from "class-variance-authority";

export interface CheckBoxProps {
    label?: string;
    isChecked: boolean;
    handleChangeCheck: (val: boolean) => void;
}

const checkBoxVariants = cva(`absolute w-6 h-6 left-0 top-0 rounded-200`, {
    variants: {
        isChecked: {
            true: `bg-s-blue`,
            false: `bg-n-neutral-100`,
        },
    },
});
const checkBoxContainerVariants = cva(`relative w-6 h-6 rounded-200 transition-all duration-200`, {
    variants: {
        isChecked: {
            true: "hover:shadow-s-blue",
        },
    },
});

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
                    src="/assets/icon/check.svg"
                    className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                />
            </div>
            {label && <p className="text-n-neutral-500 h-body-2-regular">{label}</p>}
        </label>
    );
}
