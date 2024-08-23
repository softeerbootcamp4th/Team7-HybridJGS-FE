import { Fragment, memo } from "react";
import { cva } from "class-variance-authority";

export interface ListStepProps {
    options: string[];
    selectedIdx: number;
    handleClickOption: (idx: number) => void;
}

const stepVariants = cva(
    `h-body-2-bold w-[60px] h-[36px] flex justify-center items-center cursor-pointer`,
    {
        variants: {
            selected: {
                true: "text-n-white",
                false: "text-n-neutral-500",
            },
        },
    }
);

function ListStep({ options, selectedIdx, handleClickOption }: ListStepProps) {
    const lastOptionIndex = options.length - 1;

    return (
        <ul className="inline-flex">
            {options.map((option, idx) => (
                <Fragment key={idx}>
                    <li
                        className={stepVariants({ selected: selectedIdx === idx })}
                        onClick={() => handleClickOption(idx)}
                    >
                        {option}
                    </li>
                    {idx < lastOptionIndex && <img src="/assets/icons/arrow-right.svg" />}
                </Fragment>
            ))}
        </ul>
    );
}

export default memo(ListStep);
