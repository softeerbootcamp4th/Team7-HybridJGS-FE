import Footer from "@/components/Footer";
import Notice from "@/components/Notice";
import Headline from "@/features/Main/Headline.tsx";
import LearnMore from "@/features/Main/LearnMore.tsx";
import Lottery from "@/features/Main/Lottery.tsx";
import Rush from "@/features/Main/Rush.tsx";

export default function Main() {
    return (
        <div>
            <Headline />
            <Lottery />
            <Rush />
            <LearnMore />
            <Notice />
            <Footer />
        </div>
    );
}
