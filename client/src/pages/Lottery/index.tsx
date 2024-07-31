import { useState } from "react";
import Footer from "@/components/Footer";
import Notice from "@/components/Notice";
import CustomDesign from "@/features/Lottery/CustomDesign";
import HeadLamp from "@/features/Lottery/HeadLamp";
import Headline from "@/features/Lottery/Headline";
import Intro from "@/features/Lottery/Intro";
import NewColor from "@/features/Lottery/NewColor";
import PixelDesign from "@/features/Lottery/PixelDesign";
import ShortCut from "@/features/Lottery/ShortCut";
import SmileBadge from "@/features/Lottery/SmileBadge";
import WheelDesign from "@/features/Lottery/WheelDesign";
import usePopup from "@/hooks/usePopup";
import useScrollTop from "@/hooks/useScrollTop";

export default function Lottery() {
    useScrollTop();

    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const handlePhoneNumberChange = (val: string) => {
        setPhoneNumber(val);
    };

    const { handleOpenPopup, PopupComponent } = usePopup({
        phoneNumber,
        handlePhoneNumberChange,
        confirmUrl: `/lottery/custom`,
    });

    const handleClickShortCut = () => {
        handleOpenPopup();
    };

    return (
        <div className="overflow-x-hidden">
            <Headline handleClickShortCutButton={handleClickShortCut} />
            <Intro />
            <HeadLamp />
            <PixelDesign />
            <WheelDesign />
            <CustomDesign />
            <NewColor />
            <SmileBadge />
            <ShortCut handleClickShortCutButton={handleClickShortCut} />

            <Notice />
            <Footer />

            {PopupComponent}
        </div>
    );
}
