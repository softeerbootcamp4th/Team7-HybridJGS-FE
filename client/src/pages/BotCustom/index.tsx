import { BotCustomProvider } from "@/contexts/botCustomContext";
import CasperCard from "@/features/BotCustom/CasperCard";
import EyesPanel from "@/features/BotCustom/EyesPanel";
import ListStep from "@/features/BotCustom/ListStep";
import SharedPanel from "@/features/BotCustom/SharedPanel";

export default function BotCustom() {
    return (
        <BotCustomProvider>
            <ListStep options={["눈", "입", "색상", "스티커"]} selectedIdx={0} />
            <CasperCard optionDescription="정면을 보는 15인치 알로이 휠 눈" />
            <CasperCard size="sm" />
            <EyesPanel />
            <SharedPanel selectedPanel="mouth" />
            <SharedPanel selectedPanel="sticker" />
        </BotCustomProvider>
    );
}
