import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "./index.style";

export interface ButtonHeaderProps {
    type: "light" | "dark";
    isSelected: boolean;
    url: string;
    children: ReactNode;
}

export default function ButtonHeader({ type, isSelected, url, children }: ButtonHeaderProps) {
    return (
        <Link to={url} className={buttonVariants({ isSelected, type })}>
            <p>{children}</p>
        </Link>
    );
}
