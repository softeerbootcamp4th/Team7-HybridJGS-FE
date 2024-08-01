import { EYES_OPTION, POSITION_OPTION } from "@/constants/CasperCustom/casper";
import Alloy15Center from "/public/assets/casper-custom/eyes/15inch-alloy-center.svg?react";
import Alloy15Left from "/public/assets/casper-custom/eyes/15inch-alloy-left.svg?react";
import Alloy15Right from "/public/assets/casper-custom/eyes/15inch-alloy-right.svg?react";
import Alloy17Center from "/public/assets/casper-custom/eyes/17inch-alloy-center.svg?react";
import Alloy17Left from "/public/assets/casper-custom/eyes/17inch-alloy-left.svg?react";
import Alloy17Right from "/public/assets/casper-custom/eyes/17inch-alloy-right.svg?react";
import CuteCenter from "/public/assets/casper-custom/eyes/cute-center.svg?react";
import CuteLeft from "/public/assets/casper-custom/eyes/cute-left.svg?react";
import CuteRight from "/public/assets/casper-custom/eyes/cute-right.svg?react";
import ElectricCenter from "/public/assets/casper-custom/eyes/electric-center.svg?react";
import ElectricLeft from "/public/assets/casper-custom/eyes/electric-left.svg?react";
import ElectricRight from "/public/assets/casper-custom/eyes/electric-right.svg?react";
import HeartCenter from "/public/assets/casper-custom/eyes/heart-center.svg?react";
import HeartLeft from "/public/assets/casper-custom/eyes/heart-left.svg?react";
import HeartRight from "/public/assets/casper-custom/eyes/heart-right.svg?react";
import PixelCenter from "/public/assets/casper-custom/eyes/pixel-center.svg?react";
import PixelLeft from "/public/assets/casper-custom/eyes/pixel-left.svg?react";
import PixelRight from "/public/assets/casper-custom/eyes/pixel-right.svg?react";
import SmileCenter from "/public/assets/casper-custom/eyes/smile-center.svg?react";
import SmileLeft from "/public/assets/casper-custom/eyes/smile-left.svg?react";
import SmileRight from "/public/assets/casper-custom/eyes/smile-right.svg?react";
import VacantCenter from "/public/assets/casper-custom/eyes/vacant-center.svg?react";
import VacantLeft from "/public/assets/casper-custom/eyes/vacant-left.svg?react";
import VacantRight from "/public/assets/casper-custom/eyes/vacant-right.svg?react";

type EyesOptionType = (typeof EYES_OPTION)[keyof typeof EYES_OPTION];
type EyesDirectionOptionType = (typeof POSITION_OPTION)[keyof typeof POSITION_OPTION];

const EYES_COMPONENT_MAP: Record<
    string,
    React.ComponentType<React.SVGProps<SVGSVGElement>> | null
> = {
    "15inch-alloy-center": Alloy15Center,
    "15inch-alloy-left": Alloy15Left,
    "15inch-alloy-right": Alloy15Right,
    "17inch-alloy-center": Alloy17Center,
    "17inch-alloy-left": Alloy17Left,
    "17inch-alloy-right": Alloy17Right,
    "cute-center": CuteCenter,
    "cute-left": CuteLeft,
    "cute-right": CuteRight,
    "electric-center": ElectricCenter,
    "electric-left": ElectricLeft,
    "electric-right": ElectricRight,
    "heart-center": HeartCenter,
    "heart-left": HeartLeft,
    "heart-right": HeartRight,
    "pixel-center": PixelCenter,
    "pixel-left": PixelLeft,
    "pixel-right": PixelRight,
    "smile-center": SmileCenter,
    "smile-left": SmileLeft,
    "smile-right": SmileRight,
    "vacant-center": VacantCenter,
    "vacant-left": VacantLeft,
    "vacant-right": VacantRight,
};

export function getCasperEyesComponent(
    eyesOption: EyesOptionType,
    eyesDirectionOption: EyesDirectionOptionType
): React.ComponentType<React.SVGProps<SVGSVGElement>> | null {
    const componentKey = `${eyesOption}-${eyesDirectionOption}`;
    return EYES_COMPONENT_MAP[componentKey];
}
