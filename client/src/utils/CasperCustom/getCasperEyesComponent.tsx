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

const EYES_COMPONENT_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    [`${EYES_OPTION["15INCH_ALLOY"]}-${[POSITION_OPTION.CENTER]}`]: Alloy15Center,
    [`${EYES_OPTION["15INCH_ALLOY"]}-${[POSITION_OPTION.LEFT]}`]: Alloy15Left,
    [`${EYES_OPTION["15INCH_ALLOY"]}-${[POSITION_OPTION.RIGHT]}`]: Alloy15Right,
    [`${EYES_OPTION["17INCH_ALLOY"]}-${[POSITION_OPTION.CENTER]}`]: Alloy17Center,
    [`${EYES_OPTION["17INCH_ALLOY"]}-${[POSITION_OPTION.LEFT]}`]: Alloy17Left,
    [`${EYES_OPTION["17INCH_ALLOY"]}-${[POSITION_OPTION.RIGHT]}`]: Alloy17Right,
    [`${EYES_OPTION.CUTE}-${[POSITION_OPTION.CENTER]}`]: CuteCenter,
    [`${EYES_OPTION.CUTE}-${[POSITION_OPTION.LEFT]}`]: CuteLeft,
    [`${EYES_OPTION.CUTE}-${[POSITION_OPTION.RIGHT]}`]: CuteRight,
    [`${EYES_OPTION.ELECTRIC}-${[POSITION_OPTION.CENTER]}`]: ElectricCenter,
    [`${EYES_OPTION.ELECTRIC}-${[POSITION_OPTION.LEFT]}`]: ElectricLeft,
    [`${EYES_OPTION.ELECTRIC}-${[POSITION_OPTION.RIGHT]}`]: ElectricRight,
    [`${EYES_OPTION.HEART}-${[POSITION_OPTION.CENTER]}`]: HeartCenter,
    [`${EYES_OPTION.HEART}-${[POSITION_OPTION.LEFT]}`]: HeartLeft,
    [`${EYES_OPTION.HEART}-${[POSITION_OPTION.RIGHT]}`]: HeartRight,
    [`${EYES_OPTION.PIXEL}-${[POSITION_OPTION.CENTER]}`]: PixelCenter,
    [`${EYES_OPTION.PIXEL}-${[POSITION_OPTION.LEFT]}`]: PixelLeft,
    [`${EYES_OPTION.PIXEL}-${[POSITION_OPTION.RIGHT]}`]: PixelRight,
    [`${EYES_OPTION.SMILE}-${[POSITION_OPTION.CENTER]}`]: SmileCenter,
    [`${EYES_OPTION.SMILE}-${[POSITION_OPTION.LEFT]}`]: SmileLeft,
    [`${EYES_OPTION.SMILE}-${[POSITION_OPTION.RIGHT]}`]: SmileRight,
    [`${EYES_OPTION.VACANT}-${[POSITION_OPTION.CENTER]}`]: VacantCenter,
    [`${EYES_OPTION.VACANT}-${[POSITION_OPTION.LEFT]}`]: VacantLeft,
    [`${EYES_OPTION.VACANT}-${[POSITION_OPTION.RIGHT]}`]: VacantRight,
};

export function getCasperEyesComponent(
    eyesOption: EYES_OPTION,
    eyesDirectionOption: POSITION_OPTION
): React.ComponentType<React.SVGProps<SVGSVGElement>> {
    const componentKey = `${eyesOption}-${eyesDirectionOption}`;
    return EYES_COMPONENT_MAP[componentKey];
}
