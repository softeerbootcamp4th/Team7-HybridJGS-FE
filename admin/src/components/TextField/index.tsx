import { ComponentProps } from "react";

interface TextFieldProps extends ComponentProps<"textarea"> {}

export default function TextField({ ...restProps }: TextFieldProps) {
    return (
        <textarea
            className="resize-none focus:outline-none w-full text-black"
            spellCheck={false}
            {...restProps}
        />
    );
}
