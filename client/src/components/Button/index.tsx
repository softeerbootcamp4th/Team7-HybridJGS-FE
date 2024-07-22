export interface ButtonProps {
    label: string;
    onClick?: () => void;
}

export const Button = ({ label, ...props }: ButtonProps) => {
    return (
        <button type="button" className="bg-s-blue" {...props}>
            {label}
        </button>
    );
};
