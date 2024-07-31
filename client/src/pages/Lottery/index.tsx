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
import useScrollTop from "@/hooks/useScrollTop";

export default function Lottery() {
    useScrollTop();

    return (
        <div className="overflow-x-hidden">
            <Headline />
            <Intro />
            <HeadLamp />
            <PixelDesign />
            <WheelDesign />
            <CustomDesign />
            <NewColor />
            <SmileBadge />
            <ShortCut />
            <Notice />
            <Footer />
        </div>
    );
}
