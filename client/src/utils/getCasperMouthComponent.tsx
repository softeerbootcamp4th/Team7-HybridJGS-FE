import { MOUTH_OPTION } from "@/constants/CasperCustom/casper";
import Cloudy from "/public/assets/casper-custom/mouth/cloudy.svg?react";
import Expressionsless from "/public/assets/casper-custom/mouth/expressionless.svg?react";
import Laugh from "/public/assets/casper-custom/mouth/laugh.svg?react";
import Mocking from "/public/assets/casper-custom/mouth/mocking.svg?react";
import Smile from "/public/assets/casper-custom/mouth/smile.svg?react";

type MouthOptionType = (typeof MOUTH_OPTION)[keyof typeof MOUTH_OPTION];

export function getCasperMouthComponent(
    mouth: MouthOptionType
): React.ComponentType<React.SVGProps<SVGSVGElement>> | null {
    switch (mouth) {
        case "cloudy":
            return Cloudy;
        case "expressionless":
            return Expressionsless;
        case "laugh":
            return Laugh;
        case "mocking":
            return Mocking;
        case "smile":
            return Smile;
        default:
            return null;
    }
}
