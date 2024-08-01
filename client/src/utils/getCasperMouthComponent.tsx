import { MOUTH_OPTION } from "@/constants/CasperCustom/casper";
import Cloudy from "/public/assets/casper-custom/mouth/cloudy.svg?react";
import Expressionsless from "/public/assets/casper-custom/mouth/expressionless.svg?react";
import Laugh from "/public/assets/casper-custom/mouth/laugh.svg?react";
import Mocking from "/public/assets/casper-custom/mouth/mocking.svg?react";
import Smile from "/public/assets/casper-custom/mouth/smile.svg?react";

type MouthOptionType = (typeof MOUTH_OPTION)[keyof typeof MOUTH_OPTION];

const mouthComponentMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>> | null> =
    {
        cloudy: Cloudy,
        expressionless: Expressionsless,
        laugh: Laugh,
        mocking: Mocking,
        smile: Smile,
    };

export function getCasperMouthComponent(
    mouth: MouthOptionType
): React.ComponentType<React.SVGProps<SVGSVGElement>> | null {
    return mouthComponentMap[mouth];
}
