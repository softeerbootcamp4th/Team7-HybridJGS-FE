import { HTMLProps } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
    label?: string;
}

export default function Input({ label, value, onChange, ...restProps }: InputProps) {
    return (
        <div className="flex items-center">
            {label && <p className="text-neutral-950 h-body-1-bold mx-[20px]">{label}</p>}
            <input
                className="p-[16px] border-2 border-neutral-950 rounded-lg text-neutral-950 w-[360px] h-body-1-medium"
                value={value}
                onChange={onChange}
                {...restProps}
            />
        </div>
    );
}
