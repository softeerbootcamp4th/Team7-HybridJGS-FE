import { EYES_OPTION, POSITION_OPTION } from "@/constants/BotCustom/casper";
import Alloy15Center from "/public/assets/bot-custom/eyes/15inch-alloy-center.svg?react";
import Alloy15Left from "/public/assets/bot-custom/eyes/15inch-alloy-left.svg?react";
import Alloy15Right from "/public/assets/bot-custom/eyes/15inch-alloy-right.svg?react";
import Alloy17Center from "/public/assets/bot-custom/eyes/17inch-alloy-center.svg?react";
import Alloy17Left from "/public/assets/bot-custom/eyes/17inch-alloy-left.svg?react";
import Alloy17Right from "/public/assets/bot-custom/eyes/17inch-alloy-right.svg?react";
import CuteCenter from "/public/assets/bot-custom/eyes/cute-center.svg?react";
import CuteLeft from "/public/assets/bot-custom/eyes/cute-left.svg?react";
import CuteRight from "/public/assets/bot-custom/eyes/cute-right.svg?react";
import ElectricCenter from "/public/assets/bot-custom/eyes/electric-center.svg?react";
import ElectricLeft from "/public/assets/bot-custom/eyes/electric-left.svg?react";
import ElectricRight from "/public/assets/bot-custom/eyes/electric-right.svg?react";
import HeartCenter from "/public/assets/bot-custom/eyes/heart-center.svg?react";
import HeartLeft from "/public/assets/bot-custom/eyes/heart-left.svg?react";
import HeartRight from "/public/assets/bot-custom/eyes/heart-right.svg?react";
import PixelCenter from "/public/assets/bot-custom/eyes/pixel-center.svg?react";
import PixelLeft from "/public/assets/bot-custom/eyes/pixel-left.svg?react";
import PixelRight from "/public/assets/bot-custom/eyes/pixel-right.svg?react";
import SmileCenter from "/public/assets/bot-custom/eyes/smile-center.svg?react";
import SmileLeft from "/public/assets/bot-custom/eyes/smile-left.svg?react";
import SmileRight from "/public/assets/bot-custom/eyes/smile-right.svg?react";
import VacantCenter from "/public/assets/bot-custom/eyes/vacant-center.svg?react";
import VacantLeft from "/public/assets/bot-custom/eyes/vacant-left.svg?react";
import VacantRight from "/public/assets/bot-custom/eyes/vacant-right.svg?react";

type EyesOptionType = (typeof EYES_OPTION)[keyof typeof EYES_OPTION];
type EyesDirectionOptionType = (typeof POSITION_OPTION)[keyof typeof POSITION_OPTION];

export function getCasperEyesComponent(
    eyesOption: EyesOptionType,
    eyesDirectionOption: EyesDirectionOptionType
): React.ComponentType<React.SVGProps<SVGSVGElement>> | null {
    const componentKey = `${eyesOption}-${eyesDirectionOption}`;

    switch (componentKey) {
        case "15inch-alloy-center":
            return Alloy15Center;
        case "15inch-alloy-left":
            return Alloy15Left;
        case "15inch-alloy-right":
            return Alloy15Right;
        case "17inch-alloy-center":
            return Alloy17Center;
        case "17inch-alloy-left":
            return Alloy17Left;
        case "17inch-alloy-right":
            return Alloy17Right;
        case "cute-center":
            return CuteCenter;
        case "cute-left":
            return CuteLeft;
        case "cute-right":
            return CuteRight;
        case "electric-center":
            return ElectricCenter;
        case "electric-left":
            return ElectricLeft;
        case "electric-right":
            return ElectricRight;
        case "heart-center":
            return HeartCenter;
        case "heart-left":
            return HeartLeft;
        case "heart-right":
            return HeartRight;
        case "pixel-center":
            return PixelCenter;
        case "pixel-left":
            return PixelLeft;
        case "pixel-right":
            return PixelRight;

        case "smile-center":
            return SmileCenter;
        case "smile-left":
            return SmileLeft;
        case "smile-right":
            return SmileRight;
        case "vacant-center":
            return VacantCenter;
        case "vacant-left":
            return VacantLeft;
        case "vacant-right":
            return VacantRight;
        default:
            return null;
    }
}
