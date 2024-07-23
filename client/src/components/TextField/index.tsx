import { ChangeEvent, useState } from "react";
import { cva } from "class-variance-authority";

export interface TextFieldProps {
    label: string;
    isRequired: boolean;
    size: "sm" | "lg";
    placeholder: string;
    limit: number;
    value: string;
    handleValueChange: (val: string) => void;
}

const labelVariants = cva(`text-n-white h-body-2-regular`, {
    variants: {
        isSmallSize: {
            true: "w-[390px]",
            false: "w-[560px]",
        },
    },
});
const inputVariants = cva(
    `relative bg-n-neutral-950 py-[19px] px-500 rounded-400 focus-within:bg-n-neutral-500 border border-transparent focus-within:border-s-blue cursor-pointer`,
    {
        variants: {
            isSmallSize: {
                true: "w-[390px]",
                false: "w-[560px] h-[216px]",
            },
        },
    }
);
const requiredTextVariants = cva(`inline`, {
    variants: {
        isRequired: {
            true: "text-s-blue",
        },
    },
});
const valueLengthTextVariants = cva(`absolute right-500 h-body-2-regular`, {
    variants: {
        isFocused: {
            true: "text-s-blue",
            false: "text-n-neutral-500",
        },
        isSmallSize: {
            true: "translate-y-[-50%] top-[50%]",
            false: "bottom-700",
        },
    },
});

export default function TextField({
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
