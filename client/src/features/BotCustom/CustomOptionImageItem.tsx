import { cva } from "class-variance-authority";

interface CustomOptionImageItemProps {
    optionId: string;
    selected: boolean;
    handleClickOption: () => void;
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

export default function CustomOptionImageItem({
    optionId,
    selected,
    handleClickOption,
}: CustomOptionImageItemProps) {
    return (
        <li
            className={selectableVariants({
                selected,
            })}
            onClick={handleClickOption}
        >
            <img src={`/assets/bot-custom/preview/${optionId}.png`} />
        </li>
    );
}
