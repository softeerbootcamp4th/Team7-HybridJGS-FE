import "@/index.css";

export interface CTAButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    color?: "blue" | "white";
}

export default function CTAButton({
    label,
    onClick,
    disabled = false,
    color = "blue",
}: CTAButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`button ${disabled ? "button-disabled" : `button-${color}`}`}
        >
            {label}
        </button>
    );
}
