import Footer from "@/components/Footer";
import Notice from "@/components/Notice";
import CustomDesign from "@/features/lottery/CustomDesign";
import HeadLamp from "@/features/lottery/HeadLamp";
import Headline from "@/features/lottery/Headline";
import Intro from "@/features/lottery/Intro";
import NewColor from "@/features/lottery/NewColor";
import PixelDesign from "@/features/lottery/PixelDesign";
import ShortCut from "@/features/lottery/ShortCut";
import SmileBadge from "@/features/lottery/SmileBadge";
import WheelDesign from "@/features/lottery/WheelDesign";
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
