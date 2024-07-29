import { cva } from "class-variance-authority";
import { Fragment } from "react/jsx-runtime";

interface ListStepProps {
    options: string[];
    selectedIdx: number;
}

const stepVariants = cva(`h-body-2-bold w-[60px] h-[36px] flex justify-center items-center`, {
    variants: {
        selected: {
            true: "text-n-white",
            false: "text-n-neutral-500",
        },
    },
});

export default function ListStep({ options, selectedIdx }: ListStepProps) {
    const lastOptionIndex = options.length - 1;

    return (
        <ul className="mt-[100px] inline-flex">
            {options.map((option, idx) => (
                <Fragment key={idx}>
                    <li className={stepVariants({ selected: selectedIdx === idx })}>{option}</li>
                    {idx < lastOptionIndex && <img src="/assets/icons/arrow-right.svg" />}
                </Fragment>
            ))}
        </ul>
    );
}
