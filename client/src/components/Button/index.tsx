import "@/index.css";

export interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    color?: "blue" | "white";
}

export default function Button({ label, onClick, disabled = false, color = "blue" }: ButtonProps) {
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
