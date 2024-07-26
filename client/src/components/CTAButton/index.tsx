import "@/index.css";
import ArrowIcon from "/public/assets/icon/arrow.svg?react";
import ShareIcon from "/public/assets/icon/share.svg?react";

export interface CTAButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    color?: "blue" | "white";
    hasIcon: boolean;
}

export default function CTAButton({
    label,
    onClick,
    disabled = false,
    color = "blue",
    hasIcon = false,
}: CTAButtonProps) {
    const strokeColor = disabled ? "#637381" : color === "blue" ? "#FFFFFF" : "#04AAD2";

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`button ${disabled ? "button-disabled" : `button-${color}`}`}
        >
            {label}
            {hasIcon && (
                <>
                    <ArrowIcon stroke={strokeColor} />
                    <ShareIcon stroke={strokeColor} />
                </>
            )}
        </button>
    );
}
