import { ChangeEvent, memo, useState } from "react";
import {
    inputVariants,
    labelVariants,
    requiredTextVariants,
    valueLengthTextVariants,
} from "./index.style";

export interface TextFieldProps {
    label: string;
    isRequired: boolean;
    size: "sm" | "lg";
    placeholder: string;
    limit: number;
    value: string;
    handleValueChange: (val: string) => void;
}

function TextField({
    label,
    isRequired,
    size,
    placeholder,
    limit,
    value = "",
    handleValueChange,
}: TextFieldProps) {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const isSmallSize = size === "sm";

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value.length > limit) {
            return;
        }

        handleValueChange(e.target.value);
    };

    return (
        <div className="inline-flex flex-col gap-500">
            <span className={labelVariants({ isSmallSize })}>
                <p className="inline">{label}</p>{" "}
                <p className={requiredTextVariants({ isRequired })}>
                    ({isRequired ? "필수" : "선택"})
                </p>
            </span>

            <label className={inputVariants({ isSmallSize })}>
                {isSmallSize ? (
                    <input
                        className="h-body-1-regular placeholder:text-n-neutral-500 text-n-white"
                        spellCheck={false}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                ) : (
                    <textarea
                        className="h-body-1-regular placeholder:text-n-neutral-500 text-n-white w-[528px] h-[148px]"
                        spellCheck={false}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                )}
                {(isFocused || value.length === 0) && (
                    <p className={valueLengthTextVariants({ isFocused, isSmallSize })}>
                        {value.length} / {limit}
                    </p>
                )}
            </label>
        </div>
    );
}

export default memo(TextField);
