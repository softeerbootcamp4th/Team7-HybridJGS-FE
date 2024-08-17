import { memo } from "react";
import { cva } from "class-variance-authority";

interface EyesOptionImageItemProps {
    id: string;
    isSelected: boolean;
    handleClickOption: (val: string) => void;
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

function EyesOptionImageItem({
    id,
    isSelected,
    handleClickOption,
    previewUrl,
}: EyesOptionImageItemProps) {
    return (
        <li
            className={selectableImageVariants({
                selected: isSelected,
            })}
            onClick={() => handleClickOption(id)}
        >
            <img src={`/assets/casper-custom/preview/${previewUrl}`} className="w-[148px] h-12" />
        </li>
    );
}

const MemoizedEyesOptionImageItem = memo(EyesOptionImageItem);
export { MemoizedEyesOptionImageItem as EyesOptionImageItem };
