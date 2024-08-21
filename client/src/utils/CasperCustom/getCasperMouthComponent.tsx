import { MOUTH_OPTION } from "@/constants/CasperCustom/casper";
import Cloudy from "/public/assets/casper-custom/mouth/cloudy.svg?react";
import Expressionsless from "/public/assets/casper-custom/mouth/expressionless.svg?react";
import Laugh from "/public/assets/casper-custom/mouth/laugh.svg?react";
import Mocking from "/public/assets/casper-custom/mouth/mocking.svg?react";
import Smile from "/public/assets/casper-custom/mouth/smile.svg?react";

const mouthComponentMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    [MOUTH_OPTION.CLOUDY]: Cloudy,
    [MOUTH_OPTION.EXPRESSIONLESS]: Expressionsless,
    [MOUTH_OPTION.LAUGH]: Laugh,
    [MOUTH_OPTION.MOCKING]: Mocking,
    [MOUTH_OPTION.SMILE]: Smile,
};

export function getCasperMouthComponent(
    mouth: MOUTH_OPTION
): React.ComponentType<React.SVGProps<SVGSVGElement>> {
    return mouthComponentMap[mouth];
}
