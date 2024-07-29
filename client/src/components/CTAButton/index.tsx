import { VariantProps, cva } from "class-variance-authority";
import { Link } from "react-router-dom";
import "@/index.css";
import ArrowIcon from "/public/assets/icons/arrow.svg?react";
import ShareIcon from "/public/assets/icons/share.svg?react";

const BUTTON_STATUS = {
    ACTIVE_BLUE: "activeBlue",
    ACTIVE_WHITE: "activeWhite",
    DISABLED: "disabled",
};

const buttonVariants = cva(
    "h-heading-4-bold rounded-[48px] min-w-60 max-w-[400px] py-3 px-6 h-[60px] flex justify-center items-center gap-2",
    {
        variants: {
            status: {
                activeBlue: "bg-s-blue text-n-white hover:bg-s-hover",
                activeWhite: "bg-n-white text-s-blue hover:bg-n-neutral-50 hover:text-s-hover",
                disabled: "bg-n-neutral-300 text-n-neutral-500 cursor-default",
            },
        },
    }
);

export interface CTAButtonProps extends VariantProps<typeof buttonVariants> {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    color?: "blue" | "white";
    url?: string;
    hasArrowIcon?: boolean;
    hasShareIcon?: boolean;
}

export default function CTAButton({
    label,
    onClick,
    disabled = false,
    color = "blue",
    url,
    hasArrowIcon = false,
    hasShareIcon = false,
}: CTAButtonProps) {
    const strokeColor = disabled ? "#637381" : color === "blue" ? "#FFFFFF" : "#04AAD2";
    const status = disabled
        ? BUTTON_STATUS.DISABLED
        : color === "blue"
          ? BUTTON_STATUS.ACTIVE_BLUE
          : BUTTON_STATUS.ACTIVE_WHITE;

    const baseClass = buttonVariants({ status });
    const linkClass = `${baseClass} inline-flex`;

    const isExternalLink = url && (url.startsWith("http://") || url.startsWith("https://"));

    const content = (
        <>
            {label}
            {hasArrowIcon && <ArrowIcon stroke={strokeColor} />}
            {hasShareIcon && <ShareIcon stroke={strokeColor} />}
        </>
    );

    const renderButton = () => {
        if (disabled) {
            return (
                <button disabled className={baseClass}>
                    {content}
                </button>
            );
        }

        if (!url) {
            return (
                <button onClick={onClick} className={baseClass}>
                    {content}
                </button>
            );
        }

        const LinkComponent = isExternalLink ? "a" : Link;
        const linkProps = isExternalLink
            ? { href: url, target: "_blank", rel: "noopener noreferrer" }
            : { to: url };

        return (
            <LinkComponent {...linkProps} className={linkClass}>
                {content}
            </LinkComponent>
        );
    };

    return renderButton();
}
