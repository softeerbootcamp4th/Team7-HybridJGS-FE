import { useEffect, useState } from "react";
import { MAX_APPLY } from "@/constants/CasperCustom/customStep";
import BatteryIcon from "/public/assets/casper-custom/battery.svg?react";

const batteryArray = new Array(MAX_APPLY).fill(false);

interface BatteryProps {
    applyCount: number;
}

export function Battery({ applyCount }: BatteryProps) {
    const [batteryApplyArray, setBatteryApplyArray] = useState<boolean[]>(batteryArray);

    useEffect(() => {
        const newBatteryApplyArray = batteryApplyArray.map((_, index) => index < applyCount);
        setBatteryApplyArray(newBatteryApplyArray);
    }, [applyCount]);

    return (
        <div className="w-[400px] h-[142px] relative">
            <img src="/assets/casper-custom/battery-frame.svg" className="w-[400px]" />

            <div className="flex gap-[10px] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
                {batteryApplyArray.map((battery, idx) => (
                    <BatteryIcon key={idx} fill={battery ? "#04AAD2" : "#637381"} />
                ))}
            </div>
        </div>
    );
}
