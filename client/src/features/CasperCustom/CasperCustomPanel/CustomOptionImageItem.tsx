import { memo } from "react";
import { cva } from "class-variance-authority";

interface CustomOptionImageItemProps {
    optionId: string;
    selected: boolean;
    handleClickOption: (id: string) => void;
}

const selectableVariants = cva(
    `rounded-1000 border-[2px] bg-n-white w-[72px] h-[72px] cursor-pointer`,
    {
        variants: {
            selected: {
                true: "border-s-red",
                false: "border-transparent",
            },
        },
    }
);

function CustomOptionImageItem({
    optionId,
    selected,
    handleClickOption,
}: CustomOptionImageItemProps) {
    return (
        <li
            className={selectableVariants({ selected })}
            onClick={() => handleClickOption(optionId)}
        >
            <img src={`/assets/casper-custom/preview/${optionId}.png`} />
        </li>
    );
}

const MemoizedCustomOptionImageItem = memo(CustomOptionImageItem);
export { MemoizedCustomOptionImageItem as CustomOptionImageItem };
