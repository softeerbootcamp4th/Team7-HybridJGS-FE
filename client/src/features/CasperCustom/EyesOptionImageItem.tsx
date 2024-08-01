import { cva } from "class-variance-authority";

interface EyesOptionImageItemProps {
    isSelected: boolean;
    handleClickOption: () => void;
    previewUrl: string;
}

const selectableImageVariants = cva(`rounded-1000 border-[2px] cursor-pointer`, {
    variants: {
        selected: {
            true: "border-s-red",
            false: "border-transparent",
        },
    },
});

export default function EyesOptionImageItem({
    isSelected,
    handleClickOption,
    previewUrl,
}: EyesOptionImageItemProps) {
    return (
        <li
            className={selectableImageVariants({
                selected: isSelected,
            })}
            onClick={handleClickOption}
        >
            <img
                src={`/assets/casper-custom/preview/${previewUrl}`}
                style={{ width: "148px", height: "48px" }}
            />
        </li>
    );
}
