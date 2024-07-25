import "@/index.css";
import SVGIcon from "@/utils/SVGIcon.tsx";

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
                    <SVGIcon src="/public/assets/icon/arrow.svg" stroke={strokeColor} />
                    <SVGIcon src="/public/assets/icon/share.svg" stroke={strokeColor} />
                </>
            )}
        </button>
    );
}
