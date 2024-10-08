import { ChangeEvent, memo, useState } from "react";
import { cva } from "class-variance-authority";

export interface InputProps {
    type: "light" | "dark";
    label: string;
    placeholder: string;
    value: string;
    handleValueChange: (val: string) => void;
}

const inputContainerVariants = cva(
    `block relative h-body-1-regular w-[390px] h-[64px] px-600 py-[19px] rounded-400 border border-transparent focus-within:border-s-blue`,
    {
        variants: {
            type: {
                light: "text-n-neutral-950 bg-n-neutral-50 focus-within:bg-n-white",
                dark: "text-n-white bg-n-neutral-950 focus-within:bg-n-neutral-500",
            },
        },
    }
);

function Input({ type, label, placeholder, value = "", handleValueChange }: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleValueChange(e.target.value);
    };

    return (
        <label className={inputContainerVariants({ type })}>
            <input
                className="w-[350px]"
                value={value}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {!isFocused && value.length === 0 && (
                <div className="absolute left-600 top-[11px] text-n-neutral-500">
                    <p className="block h-detail-1-regular">{label}</p>
                    <p className="block h-body-1-regular">{placeholder}</p>
                </div>
            )}
        </label>
    );
}

export default memo(Input);
